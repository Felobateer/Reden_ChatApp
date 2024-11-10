import {
  RTCPeerConnection,
  mediaDevices,
  RTCSessionDescription,
} from "react-native-webrtc";
import io from "socket.io-client";
import { API_BASE_URL } from "../config";

const socket = io(API_BASE_URL);

// ICE server configuration for WebRTC
const configuration = {
  iceServers: [
    { urls: "stun:stun.l.google.com:19302" },
    { urls: "stun:stun1.l.google.com:19302" },
  ],
};

// Call class to manage audio/video call setup, signaling, and peer connections
class Call {
  constructor() {
    this.peerConnection = null;
    this.localStream = null;
    this.remoteStream = null;
  }

  // Initialize peer connection and event handlers for ICE and track events
  initializePeerConnection = (onRemoteStreamUpdate) => {
    this.peerConnection = new RTCPeerConnection(configuration);

    this.peerConnection.onicecandidate = (event) => {
      if (event.candidate) {
        socket.emit("sendIceCandidate", { candidate: event.candidate });
      }
    };

    this.peerConnection.ontrack = (event) => {
      this.remoteStream = event.streams[0];
      onRemoteStreamUpdate(this.remoteStream); // Update UI with remote stream
    };
  };

  // Start a call (audio/video)
  startCall = async (isVideo, userId) => {
    try {
      const mediaConstraints = {
        audio: true,
        video: isVideo ? { width: 640, height: 480 } : false,
      };

      this.localStream = await mediaDevices.getUserMedia(mediaConstraints);

      // Emit call event
      socket.emit("callUser", { to: userId, offer: true, isVideo });
      this.localStream.getTracks().forEach((track) => {
        this.peerConnection.addTrack(track, this.localStream);
      });

      const offer = await this.peerConnection.createOffer();
      await this.peerConnection.setLocalDescription(
        new RTCSessionDescription(offer)
      );

      socket.emit("offer", { offer, to: userId });
      return this.localStream;
    } catch (error) {
      console.error("Error starting call", error);
    }
  };

  // Accept a call with an answer
  acceptCall = async (isVideo) => {
    try {
      const mediaConstraints = {
        audio: true,
        video: isVideo ? { width: 640, height: 480 } : false,
      };
      this.localStream = await mediaDevices.getUserMedia(mediaConstraints);

      this.localStream.getTracks().forEach((track) => {
        this.peerConnection.addTrack(track, this.localStream);
      });

      const answer = await this.peerConnection.createAnswer();
      await this.peerConnection.setLocalDescription(
        new RTCSessionDescription(answer)
      );

      socket.emit("answer", { answer });
      return this.localStream;
    } catch (error) {
      console.error("Error accepting call", error);
    }
  };

  // Handle incoming call offer
  handleOffer = async (offer, isVideo) => {
    if (!this.peerConnection) this.initializePeerConnection();

    await this.peerConnection.setRemoteDescription(
      new RTCSessionDescription(offer)
    );
    const localStream = await this.acceptCall(isVideo);
    return localStream;
  };

  // Handle incoming call answer
  handleAnswer = async (answer) => {
    await this.peerConnection.setRemoteDescription(
      new RTCSessionDescription(answer)
    );
  };

  // Handle ICE candidate
  handleIceCandidate = (candidate) => {
    this.peerConnection.addIceCandidate(candidate);
  };

  // End the call
  endCall = () => {
    socket.emit("endCall");
    if (this.localStream) {
      this.localStream.getTracks().forEach((track) => track.stop());
    }
    if (this.remoteStream) {
      this.remoteStream.getTracks().forEach((track) => track.stop());
    }
    if (this.peerConnection) {
      this.peerConnection.close();
      this.peerConnection = null;
    }
  };
}

const callService = new Call();

socket.on("offer", async ({ offer, isVideo }) => {
  const localStream = await callService.handleOffer(offer, isVideo);
  // Handle UI update for the local stream
});

socket.on("answer", async ({ answer }) => {
  await callService.handleAnswer(answer);
});

socket.on("receiveIceCandidate", ({ candidate }) => {
  callService.handleIceCandidate(candidate);
});

socket.on("endCall", () => {
  callService.endCall();
  // Update UI to show call ended
});

export default callService;

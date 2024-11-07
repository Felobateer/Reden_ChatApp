require("dotenv").config();
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const middleware = require("./middleware");
const db = require("./db");
const userRoutes = require("./routes/userRoutes");
const contactRoutes = require("./routes/contactRoutes");
const adminRoutes = require("./routes/adminRoutes");
const textingRoutes = require("./routes/textingRoutes");
const postRoutes = require("./routes/postRoutes");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.set("io", io);

io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;

  // If userId is provided, join the room for that user
  if (userId) {
    socket.join(`user_${userId}`);
    console.log(`User ${userId} joined the room`);
  } else {
    console.log("User connected without a userId");
  }

  // Handle incoming call
  socket.on("callUser", ({ to, from, offer }) => {
    console.log(`Call request from ${from} to ${to}`);
    if (to) {
      socket.to(to).emit("incomingCall", { from, offer });
    } else {
      console.log("No recipient to send the call to");
    }
  });

  // Handle call acceptance
  socket.on("acceptCall", ({ to, from, answer }) => {
    console.log(`Call accepted from ${from} to ${to}`);
    if (to) {
      socket.to(to).emit("callAccepted", { from, answer });
    } else {
      console.log("No recipient to accept the call");
    }
  });

  // Handle ICE candidates
  socket.on("sendIceCandidate", (to, candidate) => {
    console.log(`Sending ICE candidate from ${socket.id} to ${to}`);
    if (to) {
      socket.to(to).emit("receiveIceCandidate", candidate);
    } else {
      console.log("No recipient to send ICE candidate to");
    }
  });

  // Handle user disconnect
  socket.on("disconnect", () => {
    if (userId) {
      console.log(`User ${userId} disconnected`);
      // Optionally, leave the room after disconnection
      socket.leave(`user_${userId}`);
    } else {
      console.log("User disconnected without a userId");
    }
  });
});

middleware.middlewareConf(app);

app.use("/api/user", userRoutes);
app.use("/api", adminRoutes);
app.use("/api", contactRoutes);
app.use("/api", textingRoutes);
app.use("/api", postRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
});

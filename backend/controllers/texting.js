const Message = require("../models/Message"); // Adjust path if necessary
const asyncErrorHandler = require("../middleware/helpers/errorHandler"); // Middleware for error handling with async functions
const { io } = require("../socket"); // Assuming socket instance is exported from your main server file

// Create a new message
exports.createMessage = asyncErrorHandler(async (req, res, next) => {
  const { senderId, recipientId, content } = req.body;

  const newMessage = await Message.create({
    senderId,
    recipientId,
    content,
  });

  // Emit the new message to the recipient in real-time
  io.to(`user_${recipientId}`).emit("newMessage", newMessage);

  res.status(201).json({
    success: true,
    message: newMessage,
  });
});

// Edit a message
exports.editMessage = asyncErrorHandler(async (req, res, next) => {
  const { messageId, content, isRead } = req.body;

  const updatedMessage = await Message.editMessage({
    messageId,
    content,
    isRead,
  });

  if (updatedMessage) {
    // Emit message update to both sender and recipient
    io.to(`message_${messageId}`).emit("updatedMessage", {
      messageId,
      content,
      isRead,
    });

    res.status(200).json({
      success: true,
      message: "Message updated successfully",
    });
  } else {
    res.status(404).json({
      success: false,
      message: "Message not found",
    });
  }
});

// Delete a message
exports.deleteMessage = asyncErrorHandler(async (req, res, next) => {
  const { messageId } = req.params;

  const result = await Message.deleteMessage(messageId);

  if (result) {
    // Emit deletion notification to both sender and recipient
    io.to(`message_${messageId}`).emit("deletedMessage", { messageId });

    res.status(200).json({
      success: true,
      message: "Message deleted successfully",
    });
  } else {
    res.status(404).json({
      success: false,
      message: "Message not found",
    });
  }
});

// Get all messages between two users
exports.getMessagesBetweenUsers = asyncErrorHandler(async (req, res, next) => {
  const { userId1, userId2 } = req.params;

  // Get all messages between the users
  const messages = await Message.getMessagesBetweenUsers(userId1, userId2);

  // Separate messages into "sent" and "received"
  const sentMessages = messages.filter(
    (msg) => msg.sender_id === parseInt(userId1)
  );
  const receivedMessages = messages.filter(
    (msg) => msg.recipient_id === parseInt(userId1)
  );

  res.status(200).json({
    success: true,
    messages: {
      sent: sentMessages,
      received: receivedMessages,
    },
  });
});

// db/messages.js
const db = require("./config"); // Import your database connection db

// Create a new message
async function createMessage(senderId, receiverId, content) {
  const query =
    "INSERT INTO messages (sender_id, receiver_id, content) VALUES (?, ?, ?)";
  try {
    const [result] = await db.execute(query, [senderId, receiverId, content]);
    return result.insertId; // Return the ID of the new message
  } catch (error) {
    throw new Error(`Error creating message: ${error.message}`);
  }
}

// Get messages between two users
async function getMessages(userId) {
  const query =
    "SELECT * FROM messages WHERE sender_id = ?  OR receiver_id = ? ORDER BY timestamp";
  try {
    const [messages] = await db.execute(query, [userId, userId]);
    return messages; // Return the array of messages
  } catch (error) {
    throw new Error(`Error retrieving messages: ${error.message}`);
  }
}

// Delete a message by ID
async function deleteMessage(messageId) {
  const query = "DELETE FROM messages WHERE id = ?";
  try {
    const [result] = await db.execute(query, [messageId]);
    return result.affectedRows; // Return the number of deleted rows
  } catch (error) {
    throw new Error(`Error deleting message: ${error.message}`);
  }
}

module.exports = {
  createMessage,
  getMessages,
  deleteMessage,
};

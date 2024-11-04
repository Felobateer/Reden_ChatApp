const knex = require("knex")(
  require("./knexfile")[process.env.NODE_ENV || "development"]
);

class Message {
  constructor() {}

  // Create a new message
  async create(data) {
    try {
      const [messageId] = await knex("messages").insert({
        sender_id: data.senderId,
        recipient_id: data.recipientId,
        content: data.content,
        sent_at: knex.fn.now(), // Automatically use current timestamp
        is_read: data.isRead || false,
      });
      return { id: messageId };
    } catch (error) {
      throw new Error(`Error creating message: ${error.message}`);
    }
  }

  // Edit an existing message
  async editMessage(data) {
    const updatedFields = {
      content: data.content,
      is_read: data.isRead,
    };

    try {
      const results = await knex("messages")
        .where({ id: data.messageId })
        .update(updatedFields);
      return results;
    } catch (error) {
      throw new Error(`Error editing message: ${error.message}`);
    }
  }

  // Get message by id
  async getMessageById(id) {
    try {
      const message = await knex("messages").where({ id }).first();
      return message;
    } catch (error) {
      throw new Error(`Error retrieving message: ${error.message}`);
    }
  }

  // Get all messages sent by a specific user
  async getMessagesBySenderId(senderId) {
    try {
      const messages = await knex("messages").where({ sender_id: senderId });
      return messages;
    } catch (error) {
      throw new Error(`Error retrieving messages by sender: ${error.message}`);
    }
  }

  // Get all messages received by a specific user
  async getMessagesByRecipientId(recipientId) {
    try {
      const messages = await knex("messages").where({
        recipient_id: recipientId,
      });
      return messages;
    } catch (error) {
      throw new Error(
        `Error retrieving messages by recipient: ${error.message}`
      );
    }
  }

  // Search all messages available to the user
  async searchMessages(userId) {
    try {
      const messages = await knex("messages")
        .where(function () {
          this.where({ senderId: userId }).orWhere({ recipient_id: userId });
        })
        .orderBy("sent_at", "asc");
      return messages;
    } catch (err) {
      throw new Error(
        `Error searching messages for user with id ${userId}: ${err.message}`
      );
    }
  }

  // Get all messages between two users
  async getMessagesBetweenUsers(userId1, userId2) {
    try {
      const messages = await knex("messages")
        .where(function () {
          this.where({ sender_id: userId1, recipient_id: userId2 }).orWhere({
            sender_id: userId2,
            recipient_id: userId1,
          });
        })
        .orderBy("sent_at", "asc"); // Order by sent timestamp
      return messages;
    } catch (error) {
      throw new Error(
        `Error retrieving messages between users: ${error.message}`
      );
    }
  }

  // Delete a message
  async deleteMessage(messageId) {
    try {
      const results = await knex("messages").where({ id: messageId }).del();
      return results;
    } catch (error) {
      throw new Error(`Error deleting message: ${error.message}`);
    }
  }
}

module.exports = new Message();

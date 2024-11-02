const db = require("./config");
const bcrypt = require("bcrypt");

class UserSchema {
  constructor() {}

  // Create a new user
  async createUser(firstName, lastName, email, password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const query =
      "INSERT INTO users (first_name, last_name, email, password) VALUES (?, ?, ?, ?)";

    try {
      const [results] = await db.execute(query, [
        firstName,
        lastName,
        email,
        hashedPassword,
      ]);
      return results;
    } catch (error) {
      throw new Error(`Error creating user: ${error.message}`);
    }
  }

  // Edit an existing user
  async editUser(userId, firstName, lastName, email) {
    const query =
      "UPDATE users SET first_name = ?, last_name = ?, email = ? WHERE id = ?";

    try {
      const [results] = await db.execute(query, [
        firstName,
        lastName,
        email,
        userId,
      ]);
      return results;
    } catch (error) {
      throw new Error(`Error editing user: ${error.message}`);
    }
  }

  //Get user by id
  async getUserById(id) {
    const query = "SELECT * FROM users WHERE id = ?";

    try {
      const [results] = await db.execute(query, [id]);
      return results[0];
    } catch (err) {
      throw new Error(`Error retrieving user: ${err.message}`);
    }
  }

  // Get user by email
  async getUserByEmail(email) {
    const query = "SELECT * FROM users WHERE email = ?";

    try {
      const [results] = await db.execute(query, [email]);
      return results[0]; // Return the first user found
    } catch (error) {
      throw new Error(`Error retrieving user: ${error.message}`);
    }
  }

  // Get all users
  async getAllUsers() {
    const query = "SELECT * FROM users";

    try {
      const [results] = await db.execute(query);
      return results;
    } catch (error) {
      throw new Error(`Error retrieving users: ${error.message}`);
    }
  }

  // Delete a user
  async deleteUser(userId) {
    const query = "DELETE FROM users WHERE id = ?";

    try {
      const [results] = await db.execute(query, [userId]);
      return results;
    } catch (error) {
      throw new Error(`Error deleting user: ${error.message}`);
    }
  }
}

module.exports = new UserSchema();

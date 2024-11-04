const bcrypt = require("bcrypt");
const knex = require("knex")(
  require("./knexfile")[process.env.NODE_ENV || "development"]
);

class User {
  constructor() {}

  // Create a new user
  async create(data) {
    const hashedPassword = await bcrypt.hash(data.password, 10);

    try {
      const [userId] = await knex("users").insert({
        first_name: data.firstName,
        last_name: data.lastName,
        email: data.email,
        login_domain: data.loginDomain,
        photo: data.photo,
        gender: data.gender,
        secondary_email: data.secondaryEmail,
        password: hashedPassword,
      });
      return { id: userId };
    } catch (error) {
      throw new Error(`Error creating user: ${error.message}`);
    }
  }

  // Edit an existing user
  async editUser(data) {
    const updatedFields = {
      first_name: data.firstName,
      last_name: data.lastName,
      email: data.email,
      login_domain: data.loginDomain,
      photo: data.photo,
      gender: data.gender,
      secondary_email: data.secondaryEmail,
    };

    try {
      const results = await knex("users")
        .where({ id: data.userId })
        .update(updatedFields);
      return results;
    } catch (error) {
      throw new Error(`Error editing user: ${error.message}`);
    }
  }

  // Get user by id
  async getUserById(id) {
    try {
      const user = await knex("users").where({ id }).first();
      return user;
    } catch (error) {
      throw new Error(`Error retrieving user: ${error.message}`);
    }
  }

  // Get user by email
  async getUserByEmail(email) {
    try {
      const user = await knex("users").where({ email }).first();
      return user;
    } catch (error) {
      throw new Error(`Error retrieving user: ${error.message}`);
    }
  }

  // Get all users
  async getAllUsers() {
    try {
      const users = await knex("users").select("*");
      return users;
    } catch (error) {
      throw new Error(`Error retrieving users: ${error.message}`);
    }
  }

  // Delete a user
  async deleteUser(userId) {
    try {
      const results = await knex("users").where({ id: userId }).del();
      return results;
    } catch (error) {
      throw new Error(`Error deleting user: ${error.message}`);
    }
  }
}

module.exports = new User();

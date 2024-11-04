const knex = require("knex")(
  require("./knexfile")[process.env.NODE_ENV || "development"]
);

class Contact {
  constructor() {}

  // Create a new contact
  async create(data) {
    try {
      const [contactId] = await knex("contacts").insert({
        user_id: data.userId,
        first_name: data.firstName,
        last_name: data.lastName,
        email: data.email,
        photo: data.photo,
        isBlocked: data.isBlocked || false,
      });
      return { id: contactId };
    } catch (error) {
      throw new Error(`Error creating contact: ${error.message}`);
    }
  }

  // Edit an existing contact
  async editContact(data) {
    const updatedFields = {
      first_name: data.firstName,
      last_name: data.lastName,
      email: data.email,
      photo: data.photo,
      isBlocked: data.isBlocked,
    };

    try {
      const results = await knex("contacts")
        .where({ id: data.contactId })
        .update(updatedFields);
      return results;
    } catch (error) {
      throw new Error(`Error editing contact: ${error.message}`);
    }
  }

  // Get contact by id
  async getContactById(id) {
    try {
      const contact = await knex("contacts").where({ id }).first();
      return contact;
    } catch (error) {
      throw new Error(`Error retrieving contact: ${error.message}`);
    }
  }

  // Get contact by email
  async getContactByEmail(email) {
    try {
      const contact = await knex("contacts").where({ email }).first();
      return contact;
    } catch (error) {
      throw new Error(`Error retrieving contact: ${error.message}`);
    }
  }

  // Get all contacts
  async getAllContacts() {
    try {
      const contacts = await knex("contacts").select("*");
      return contacts;
    } catch (error) {
      throw new Error(`Error retrieving contacts: ${error.message}`);
    }
  }

  // Delete a contact
  async deleteContact(contactId) {
    try {
      const results = await knex("contacts").where({ id: contactId }).del();
      return results;
    } catch (error) {
      throw new Error(`Error deleting contact: ${error.message}`);
    }
  }
}

module.exports = new Contact();

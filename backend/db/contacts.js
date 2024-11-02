const db = require("./config");

class ContactSchema {
  constructor() {}

  // Create a new contact
  async createContact(firstName, lastName, email) {
    const query =
      "INSERT INTO contacts (first_name, last_name, email) VALUES (?, ?, ?)";

    try {
      const [results] = await db.execute(query, [firstName, lastName, email]);
      return results;
    } catch (error) {
      throw new Error(`Error creating contact: ${error.message}`);
    }
  }

  // Edit an existing contact
  async editContact(contactId, firstName, lastName, email) {
    const query =
      "UPDATE contacts SET first_name = ?, last_name = ?, email = ? WHERE id = ?";

    try {
      const [results] = await db.execute(query, [
        firstName,
        lastName,
        email,
        contactId,
      ]);
      return results;
    } catch (error) {
      throw new Error(`Error editing contact: ${error.message}`);
    }
  }

  // Get contact by email
  async getContactByEmail(email) {
    const query = "SELECT * FROM contacts WHERE email = ?";

    try {
      const [results] = await db.execute(query, [email]);
      return results[0]; // Return the first contact found
    } catch (error) {
      throw new Error(`Error retrieving contact: ${error.message}`);
    }
  }

  // Get contact by id
  async getContactById(id) {
    const query = "SELECT * FROM contacts WHERE id = ?";

    try {
      const [results] = await db.execute(query, [id]);
      return results[0]; // Return the first contact found
    } catch (error) {
      throw new Error(`Error retrieving contact: ${error.message}`);
    }
  }

  // Get all contacts
  async getAllContacts() {
    const query = "SELECT * FROM contacts";

    try {
      const [results] = await db.execute(query);
      return results;
    } catch (error) {
      throw new Error(`Error retrieving contacts: ${error.message}`);
    }
  }

  // Delete a contact
  async deleteContact(contactId) {
    const query = "DELETE FROM contacts WHERE id = ?";

    try {
      const [results] = await db.execute(query, [contactId]);
      return results;
    } catch (error) {
      throw new Error(`Error deleting contact: ${error.message}`);
    }
  }
}

module.exports = new ContactSchema();

const express = require("express");
const router = express.Router();
const contactController = require("../controllers/contactController");
const isAuthenticatedUser = require("../middleware/user_actions/auth"); // Adjust to your auth middleware

// Create a contact
router.post("/contacts", isAuthenticatedUser, contactController.createContact);

// Edit a contact
router.put("/contacts", isAuthenticatedUser, contactController.editContact);

// Get a single contact
router.get(
  "/contacts/:contactId",
  isAuthenticatedUser,
  contactController.getContact
);

// Get all contacts of the authenticated user
router.get("/contacts", isAuthenticatedUser, contactController.getAllContacts);

// Delete a contact
router.delete(
  "/contacts/:contactId",
  isAuthenticatedUser,
  contactController.deleteContact
);

module.exports = router;

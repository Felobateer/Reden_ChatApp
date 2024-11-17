const Contact = require("../models/Contact"); // Adjust path to where your Contact model is located
const ErrorHandler = require("../utils/errorHandler"); // Adjust to your error handler
const asyncErrorHandler = require("../middleware/helpers/errorHandler"); // Assuming you have an async error handler

// Create a new contact
exports.createContact = asyncErrorHandler(async (req, res, next) => {
  const { firstName, lastName, email, photo, isBlocked } = req.body;
  const userId = req.user.id; // Assuming user is authenticated and req.user contains user info

  if (!firstName || !lastName || !email) {
    return next(
      new ErrorHandler("Please provide first name, last name, and email", 400)
    );
  }

  const newContactData = {
    userId,
    firstName,
    lastName,
    email,
    photo,
    isBlocked: isBlocked || false,
  };

  const contact = await Contact.create(newContactData);

  res.status(201).json({
    success: true,
    message: "Contact created successfully",
    contact: { id: contact.id, firstName, lastName, email, photo, isBlocked },
  });
});

// Edit an existing contact
exports.editContact = asyncErrorHandler(async (req, res, next) => {
  const { contactId, firstName, lastName, email, photo, isBlocked } = req.body;
  const userId = req.user.id; // Assuming user is authenticated and req.user contains user info

  if (!contactId || !firstName || !lastName || !email) {
    return next(
      new ErrorHandler(
        "Please provide contactId, first name, last name, and email",
        400
      )
    );
  }

  // Check if the contact exists and belongs to the current user
  const contact = await Contact.getContactById(contactId);
  if (!contact || contact.user_id !== userId) {
    return next(
      new ErrorHandler(
        "Contact not found or you don't have permission to edit this contact",
        404
      )
    );
  }

  const updatedContact = await Contact.editContact({
    contactId,
    firstName,
    lastName,
    email,
    photo,
    isBlocked,
  });

  res.status(200).json({
    success: true,
    message: "Contact updated successfully",
    contact: { id: contactId, firstName, lastName, email, photo, isBlocked },
  });
});

// Get a contact by ID
exports.getContact = asyncErrorHandler(async (req, res, next) => {
  const { contactId } = req.params;

  if (!contactId) {
    return next(new ErrorHandler("Contact ID is required", 400));
  }

  const contact = await Contact.getContactById(contactId);
  if (!contact) {
    return next(new ErrorHandler("Contact not found", 404));
  }

  res.status(200).json({
    success: true,
    contact,
  });
});

// Get all contacts of the authenticated user
exports.getAllContacts = asyncErrorHandler(async (req, res, next) => {
  const userId = req.user.id; // Assuming the user is authenticated and `req.user` contains the user info

  const contacts = await Contact.getAllContactsByUserId(userId);

  res.status(200).json({
    success: true,
    contacts,
  });
});

// Delete a contact
exports.deleteContact = asyncErrorHandler(async (req, res, next) => {
  const { contactId } = req.params;
  const userId = req.user.id; // Assuming the user is authenticated

  if (!contactId) {
    return next(new ErrorHandler("Contact ID is required", 400));
  }

  // Check if the contact exists and belongs to the current user
  const contact = await Contact.getContactById(contactId);
  if (!contact || contact.user_id !== userId) {
    return next(
      new ErrorHandler(
        "Contact not found or you don't have permission to delete this contact",
        404
      )
    );
  }

  await Contact.deleteContact(contactId);

  res.status(200).json({
    success: true,
    message: "Contact deleted successfully",
  });
});

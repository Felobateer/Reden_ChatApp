const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");
const isAuthenticatedUser = require("../middleware/user_actions/auth"); // Make sure authentication middleware is defined

// Public routes
router.get("/posts", postController.getAllPosts); // Get all posts

// Authenticated routes
router.post("/posts", isAuthenticatedUser, postController.createPost); // Create a post
router.put("/posts", isAuthenticatedUser, postController.editPost); // Edit a post
router.get("/posts/:postId", postController.getPost); // Get a single post
router.delete("/posts/:postId", isAuthenticatedUser, postController.deletePost); // Delete a post

module.exports = router;

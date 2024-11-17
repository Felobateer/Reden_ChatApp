const Post = require("../models/Post"); // Adjust the path to where the Post model is stored
const ErrorHandler = require("../utils/errorHandler"); // Ensure this utility exists
const asyncErrorHandler = require("../middleware/helpers/errorHandler"); // Async error handler middleware

// Create a new post
exports.createPost = asyncErrorHandler(async (req, res, next) => {
  const { title, content } = req.body;
  const userId = req.user.id; // Assuming the user is authenticated and `req.user` is populated by middleware

  if (!title || !content) {
    return next(new ErrorHandler("Please provide both title and content", 400));
  }

  const newPostData = {
    userId,
    title,
    content,
  };

  const post = await Post.create(newPostData);

  res.status(201).json({
    success: true,
    message: "Post created successfully",
    post: { id: post.id, title, content },
  });
});

// Edit an existing post
exports.editPost = asyncErrorHandler(async (req, res, next) => {
  const { postId, title, content } = req.body;
  const userId = req.user.id; // Assuming the user is authenticated

  if (!postId || !title || !content) {
    return next(
      new ErrorHandler("Please provide postId, title, and content", 400)
    );
  }

  // Check if the post exists and belongs to the current user
  const post = await Post.getPostById(postId);
  if (!post || post.user_id !== userId) {
    return next(
      new ErrorHandler(
        "Post not found or you don't have permission to edit this post",
        404
      )
    );
  }

  const updatedPost = await Post.editPost({ postId, title, content });

  res.status(200).json({
    success: true,
    message: "Post updated successfully",
    post: { id: postId, title, content },
  });
});

// Get a post by ID
exports.getPost = asyncErrorHandler(async (req, res, next) => {
  const { postId } = req.params;

  if (!postId) {
    return next(new ErrorHandler("Post ID is required", 400));
  }

  const post = await Post.getPostById(postId);
  if (!post) {
    return next(new ErrorHandler("Post not found", 404));
  }

  res.status(200).json({
    success: true,
    post,
  });
});

// Get all posts by a specific user
exports.getPostsByUser = asyncErrorHandler(async (req, res, next) => {
  const userId = req.user.id; // Assuming the user is authenticated

  const posts = await Post.getPostsByUserId(userId);
  res.status(200).json({
    success: true,
    posts,
  });
});

// Get all posts (Admin or Public)
exports.getAllPosts = asyncErrorHandler(async (req, res, next) => {
  const posts = await Post.getAllPosts();

  res.status(200).json({
    success: true,
    posts,
  });
});

// Delete a post
exports.deletePost = asyncErrorHandler(async (req, res, next) => {
  const { postId } = req.params;
  const userId = req.user.id; // Assuming the user is authenticated

  if (!postId) {
    return next(new ErrorHandler("Post ID is required", 400));
  }

  const post = await Post.getPostById(postId);
  if (!post || post.user_id !== userId) {
    return next(
      new ErrorHandler(
        "Post not found or you don't have permission to delete this post",
        404
      )
    );
  }

  await Post.deletePost(postId);

  res.status(200).json({
    success: true,
    message: "Post deleted successfully",
  });
});

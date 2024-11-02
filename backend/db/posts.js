// db/posts.js
const db = require("./config"); // Import your database connection db

// Create a new post
async function createPost(userId, content) {
  const query = "INSERT INTO posts (user_id, content) VALUES (?, ?)";
  try {
    const [result] = await db.execute(query, [userId, content]);
    return result.insertId; // Return the ID of the new post
  } catch (error) {
    throw new Error(`Error creating post: ${error.message}`);
  }
}

// Get all posts
async function getPosts() {
  const query = "SELECT * FROM posts ORDER BY created_at DESC";
  try {
    const [posts] = await db.execute(query);
    return posts; // Return the array of posts
  } catch (error) {
    throw new Error(`Error retrieving posts: ${error.message}`);
  }
}

// Get a specific post by ID
async function getPostById(postId) {
  const query = "SELECT * FROM posts WHERE id = ?";
  try {
    const [post] = await db.execute(query, [postId]);
    return post[0]; // Return the single post
  } catch (error) {
    throw new Error(`Error retrieving post: ${error.message}`);
  }
}

// Delete a post by ID
async function deletePost(postId) {
  const query = "DELETE FROM posts WHERE id = ?";
  try {
    const [result] = await db.execute(query, [postId]);
    return result.affectedRows; // Return the number of deleted rows
  } catch (error) {
    throw new Error(`Error deleting post: ${error.message}`);
  }
}

module.exports = {
  createPost,
  getPosts,
  getPostById,
  deletePost,
};

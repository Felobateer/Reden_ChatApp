const knex = require("knex")(
  require("./knexfile")[process.env.NODE_ENV || "development"]
);

class Post {
  constructor() {}

  // Create a new post
  async create(data) {
    try {
      const [postId] = await knex("posts").insert({
        user_id: data.userId,
        title: data.title,
        content: data.content,
        created_at: knex.fn.now(), // Automatically use current timestamp
        updated_at: knex.fn.now(), // Automatically use current timestamp
      });
      return { id: postId };
    } catch (error) {
      throw new Error(`Error creating post: ${error.message}`);
    }
  }

  // Edit an existing post
  async editPost(data) {
    const updatedFields = {
      title: data.title,
      content: data.content,
      updated_at: knex.fn.now(), // Update the timestamp on edit
    };

    try {
      const results = await knex("posts")
        .where({ id: data.postId })
        .update(updatedFields);
      return results;
    } catch (error) {
      throw new Error(`Error editing post: ${error.message}`);
    }
  }

  // Get post by id
  async getPostById(id) {
    try {
      const post = await knex("posts").where({ id }).first();
      return post;
    } catch (error) {
      throw new Error(`Error retrieving post: ${error.message}`);
    }
  }

  // Get all posts by a specific user
  async getPostsByUserId(userId) {
    try {
      const posts = await knex("posts").where({ user_id: userId });
      return posts;
    } catch (error) {
      throw new Error(`Error retrieving posts by user: ${error.message}`);
    }
  }

  // Get all posts
  async getAllPosts() {
    try {
      const posts = await knex("posts").select("*");
      return posts;
    } catch (error) {
      throw new Error(`Error retrieving posts: ${error.message}`);
    }
  }

  // Delete a post
  async deletePost(postId) {
    try {
      const results = await knex("posts").where({ id: postId }).del();
      return results;
    } catch (error) {
      throw new Error(`Error deleting post: ${error.message}`);
    }
  }
}

module.exports = new Post();

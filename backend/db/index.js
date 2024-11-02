import { UserSchema } from "./users";
import { ContactSchema } from "./contacts";
import { createPost, getPosts, getPostById, deletePost } from "./posts";
import {
  createMessage,
  getMessages,
  searchMessages,
  deleteMessage,
} from "./messages";

module.exports = {
  UserSchema,
  ContactSchema,
  createPost,
  getPosts,
  getPostById,
  deletePost,
  createMessage,
  getMessages,
  searchMessages,
  deleteMessage,
};

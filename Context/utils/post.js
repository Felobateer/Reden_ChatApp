import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_BASE_URL } from "../config";

// Configure Axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add token to each request via interceptor
api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// GET ALL POSTS
export const getAllPosts = async () => {
  try {
    const response = await api.get("/posts");
    return response.data; // Array of posts
  } catch (error) {
    console.error("Get all posts error", error.response?.data || error.message);
    throw error.response?.data || "Failed to retrieve posts";
  }
};

// CREATE A NEW POST
export const createPost = async (postData) => {
  try {
    const response = await api.post("/posts", postData);
    return response.data; // Newly created post
  } catch (error) {
    console.error("Create post error", error.response?.data || error.message);
    throw error.response?.data || "Failed to create post";
  }
};

// EDIT POST
export const editPost = async (postId, updatedData) => {
  try {
    const response = await api.put(`/posts/${postId}`, updatedData);
    return response.data; // Updated post data
  } catch (error) {
    console.error("Edit post error", error.response?.data || error.message);
    throw error.response?.data || "Failed to edit post";
  }
};

// DELETE POST
export const deletePost = async (postId) => {
  try {
    const response = await api.delete(`/posts/${postId}`);
    return response.data; // Confirmation message or updated post list
  } catch (error) {
    console.error("Delete post error", error.response?.data || error.message);
    throw error.response?.data || "Failed to delete post";
  }
};

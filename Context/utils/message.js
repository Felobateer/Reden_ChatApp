import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_BASE_URL } from "../config";

// Configure Axios for API requests
const api = axios.create({
  baseURL: `${API_BASE_URL}/text`,
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

// GET ALL MESSAGES (for a specific conversation)
export const getAllMessages = async (conversationId) => {
  try {
    const response = await api.get(`/show`);
    return response.data; // Array of messages for the conversation
  } catch (error) {
    console.error(
      "Get all messages error",
      error.response?.data || error.message
    );
    throw error.response?.data || "Failed to retrieve messages";
  }
};

// CREATE MESSAGE
export const createMessage = async (messageData) => {
  try {
    const response = await api.post("/create", messageData);
    return response.data; // Return newly created message data
  } catch (error) {
    console.error(
      "Create message error",
      error.response?.data || error.message
    );
    throw error.response?.data || "Failed to create message";
  }
};

// EDIT MESSAGE
export const editMessage = async (messageId, updatedData) => {
  try {
    const response = await api.put(`/${messageId}`, updatedData);
    return response.data; // Return updated message data
  } catch (error) {
    console.error("Edit message error", error.response?.data || error.message);
    throw error.response?.data || "Failed to edit message";
  }
};

// DELETE MESSAGE
export const deleteMessage = async (messageId) => {
  try {
    const response = await api.delete(`/${messageId}`);
    return response.data; // Return deletion confirmation
  } catch (error) {
    console.error(
      "Delete message error",
      error.response?.data || error.message
    );
    throw error.response?.data || "Failed to delete message";
  }
};

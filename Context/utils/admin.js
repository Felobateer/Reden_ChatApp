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

// GET ALL USERS
export const getAllUsers = async () => {
  try {
    const response = await api.get("/admin/users");
    return response.data; // Array of user objects
  } catch (error) {
    console.error("Get all users error", error.response?.data || error.message);
    throw error.response?.data || "Failed to retrieve users";
  }
};

// GET ONE USER BY ID
export const getUserById = async (userId) => {
  try {
    const response = await api.get(`/admin/user/${userId}`);
    return response.data; // User object
  } catch (error) {
    console.error("Get user error", error.response?.data || error.message);
    throw error.response?.data || "Failed to retrieve user";
  }
};

// EDIT USER
export const editUser = async (userId, updatedData) => {
  try {
    const response = await api.put(`/admin/user/${userId}`, updatedData);
    return response.data; // Updated user object
  } catch (error) {
    console.error("Edit user error", error.response?.data || error.message);
    throw error.response?.data || "Failed to edit user";
  }
};

// DELETE USER
export const deleteUser = async (userId) => {
  try {
    const response = await api.delete(`/admin/user/${userId}`);
    return response.data; // Confirmation message or updated user list
  } catch (error) {
    console.error("Delete user error", error.response?.data || error.message);
    throw error.response?.data || "Failed to delete user";
  }
};

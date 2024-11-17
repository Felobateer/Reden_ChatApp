import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_BASE_URL } from "../config";

// Configure Axios for API requests
const api = axios.create({
  baseURL: `${API_BASE_URL}/contacts`,
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

// CREATE CONTACT
export const createContact = async (contactData) => {
  try {
    const response = await api.post("/contacts", contactData);
    return response.data; // Return the newly created contact
  } catch (error) {
    console.error(
      "Create contact error",
      error.response?.data || error.message
    );
    throw error.response?.data || "Failed to create contact";
  }
};

// EDIT CONTACT
export const editContact = async (contactId, updatedData) => {
  try {
    const response = await api.put(`/contacts`, updatedData);
    return response.data; // Return updated contact info
  } catch (error) {
    console.error("Edit contact error", error.response?.data || error.message);
    throw error.response?.data || "Failed to edit contact";
  }
};

// GET ALL CONTACTS
export const getAllContacts = async () => {
  try {
    const response = await api.get("/contacts");
    return response.data; // Return array of contacts
  } catch (error) {
    console.error(
      "Get all contacts error",
      error.response?.data || error.message
    );
    throw error.response?.data || "Failed to retrieve contacts";
  }
};

// GET ONE CONTACT
export const getOneContact = async (contactId) => {
  try {
    const response = await api.get(`/contacts/${contactId}`);
    return response.data; // Return a single contact object
  } catch (error) {
    console.error("Get contact error", error.response?.data || error.message);
    throw error.response?.data || "Failed to retrieve contact";
  }
};

// DELETE CONTACT
export const deleteContact = async (contactId) => {
  try {
    const response = await api.delete(`/contacts/${contactId}`);
    return response.data; // Return deletion confirmation or updated list
  } catch (error) {
    console.error(
      "Delete contact error",
      error.response?.data || error.message
    );
    throw error.response?.data || "Failed to delete contact";
  }
};

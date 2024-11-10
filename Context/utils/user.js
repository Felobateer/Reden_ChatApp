import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_BASE_URL } from "../config";

// Configure Axios for API requests
const api = axios.create({
  baseURL: `${API_BASE_URL}/user`,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add an Axios interceptor to include the token in each request
api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// UPDATE PASSWORD FUNCTION
export const updatePassword = async (oldPassword, newPassword) => {
  try {
    const response = await api.put("/password/update", {
      oldPassword,
      newPassword,
    });
    return response.data;
  } catch (error) {
    console.error(
      "Update password error",
      error.response?.data || error.message
    );
    throw error.response?.data || "Password update failed";
  }
};

// UPDATE USER INFORMATION FUNCTION
export const updateUser = async (dispatch, updatedData) => {
  try {
    const response = await api.put("/details-update", updatedData);
    const updatedUserInfo = response.data.user;

    // Update the AsyncStorage and context with new user info
    await AsyncStorage.setItem("userInfo", JSON.stringify(updatedUserInfo));
    dispatch({ type: "EDIT_USER_INFO", payload: updatedUserInfo });

    return updatedUserInfo;
  } catch (error) {
    console.error(
      "Update user info error",
      error.response?.data || error.message
    );
    throw error.response?.data || "User update failed";
  }
};

// GET USER INFORMATION FUNCTION
export const getUserInfo = async (dispatch) => {
  try {
    const response = await api.get("/details-show");
    const userInfo = response.data.user;

    // Store the fetched user info in AsyncStorage and update context
    await AsyncStorage.setItem("userInfo", JSON.stringify(userInfo));
    dispatch({ type: "SET_USER_INFO", payload: userInfo });

    return userInfo;
  } catch (error) {
    console.error("Get user info error", error.response?.data || error.message);
    throw error.response?.data || "User info retrieval failed";
  }
};

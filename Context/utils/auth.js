import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_BASE_URL } from "../config"; // Make sure to define API_BASE_URL in config

// Configure Axios for API requests
const api = axios.create({
  baseURL: `${API_BASE_URL}/user`,
  headers: {
    "Content-Type": "application/json",
  },
});

// Helper function to store token and user data
const storeUserData = async (token, userInfo) => {
  try {
    await AsyncStorage.setItem("token", token);
    await AsyncStorage.setItem("userInfo", JSON.stringify(userInfo));
  } catch (error) {
    console.error("Error storing user data", error);
  }
};

// Helper function to remove stored token and user data
const clearUserData = async () => {
  try {
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("userInfo");
  } catch (error) {
    console.error("Error clearing user data", error);
  }
};

// SIGNUP FUNCTION
export const signup = async (dispatch, userData) => {
  try {
    const response = await api.post("/register", userData);
    const { token, user } = response.data;

    // Store token and user data in AsyncStorage and context
    await storeUserData(token, user);
    dispatch({ type: "REGISTER", payload: { token, userInfo: user } });

    return response.data;
  } catch (error) {
    console.error("Signup error", error.response?.data || error.message);
    throw error.response?.data || "Signup failed";
  }
};

// LOGIN FUNCTION
export const login = async (dispatch, credentials) => {
  try {
    const response = await api.post("/login", credentials);
    const { token, user } = response.data;

    // Store token and user data in AsyncStorage and context
    await storeUserData(token, user);
    dispatch({ type: "LOGIN", payload: { token, userInfo: user } });

    return response.data;
  } catch (error) {
    console.error("Login error", error.response?.data || error.message);
    throw error.response?.data || "Login failed";
  }
};

// LOGOUT FUNCTION
export const logout = async (dispatch) => {
  try {
    await api.post("/logout");
    await clearUserData();

    // Update context to log out
    dispatch({ type: "LOGOUT" });
  } catch (error) {
    console.error("Logout error", error.response?.data || error.message);
    throw error.response?.data || "Logout failed";
  }
};

// FORGOT PASSWORD FUNCTION
export const forgotPassword = async (email) => {
  try {
    const response = await api.post("/password/forgot", { email });
    return response.data;
  } catch (error) {
    console.error(
      "Forgot password error",
      error.response?.data || error.message
    );
    throw error.response?.data || "Forgot password failed";
  }
};

// RESET PASSWORD FUNCTION
export const resetPassword = async (resetToken, newPassword) => {
  try {
    const response = await api.put(`/password/reset/${resetToken}`, {
      password: newPassword,
    });
    return response.data;
  } catch (error) {
    console.error(
      "Reset password error",
      error.response?.data || error.message
    );
    throw error.response?.data || "Reset password failed";
  }
};

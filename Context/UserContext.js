import React, { useReducer, createContext } from "react";

// Initial state with empty token and userInfo
const initialState = {
  token: "",
  userInfo: {},
  isLoggedIn: false,
};

export const UserContext = createContext(initialState);

// Define reducer function to manage state based on actions
const UserReducer = (state, action) => {
  switch (action.type) {
    case "EditUserInfo":
      return {
        ...state,
        userInfo: { ...state.userInfo, ...action.payload },
      };

    case "Register":
      return {
        ...state,
        userInfo: action.payload.userInfo,
        token: action.payload.token,
        isLoggedIn: true,
      };

    case "Login":
      return {
        ...state,
        token: action.payload.token,
        userInfo: action.payload.userInfo,
        isLoggedIn: true,
      };

    case "Logout":
      return {
        ...initialState,
      };

    default:
      return state;
  }
};

// Context provider component to manage and provide user state
export const UserContextProvider = ({ children }) => {
  const [userState, dispatch] = useReducer(userReducer, initialState);

  return (
    <UserContext.Provider value={{ userState, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};

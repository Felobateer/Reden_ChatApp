import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Login from "../Screens/Auth/login";
import Signup from "../Screens/Auth/signup";

const AuthStack = createStackNavigator();

const AuthNavigator = () => (
  <AuthStack.Navigator initialRouteName="Login">
    <AuthStack.Screen name="Login" component={Login} />
    <AuthStack.Screen name="Signup" component={Signup} />
  </AuthStack.Navigator>
);

export default AuthNavigator;

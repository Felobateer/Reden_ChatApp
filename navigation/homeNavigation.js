// navigation/MainNavigator.js
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Home from "../Screens/Home/Home";
// import Details from '../screens/Main/Details';

const MainStack = createStackNavigator();

const HomeNavigation = () => (
  <MainStack.Navigator initialRouteName="Home">
    <MainStack.Screen name="Home" component={Home} />
    {/* <MainStack.Screen name="Details" component={Details} /> */}
  </MainStack.Navigator>
);

export default HomeNavigation;

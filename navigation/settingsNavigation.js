import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Profile from "../Screens/Settings/Profile";
// import Preferences from "../screens/Settings/Preferences";

const SettingsStack = createStackNavigator();

const SettingsNavigator = () => (
  <SettingsStack.Navigator initialRouteName="Profile">
    <SettingsStack.Screen name="Profile" component={Profile} />
    {/* <SettingsStack.Screen name="Preferences" component={Preferences} /> */}
  </SettingsStack.Navigator>
);

export default SettingsNavigator;

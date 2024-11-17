import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";

import AuthNavigation from "./authNavigation";
import HomeNavigation from "./homeNavigation";
import SettingsNavigation from "./settingsNavigation";

const Tab = createBottomTabNavigator();

const MainNavigation = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="Auth">
        <Tab.Screen
          name="Auth"
          component={AuthNavigation}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="Main"
          component={HomeNavigation}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="Settings"
          component={SettingsNavigation}
          options={{ headerShown: false }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigation;

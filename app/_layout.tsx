import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Index from "./index";
import TestModeView from "./test_mode";

const Tab = createBottomTabNavigator();

export default function RootLayout() {
  return(
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Index}/>
      <Tab.Screen name="QCM" component={TestModeView}/>
  </Tab.Navigator>
  )
}

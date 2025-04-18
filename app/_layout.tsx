import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Index from "./index";
import TestModeView from "./test_mode";
import LearningModeView from "./learning_mode";

const Tab = createBottomTabNavigator();

export default function RootLayout() {
  return(
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Index}/>
      <Tab.Screen name="Time to learn" component={LearningModeView}/>
      <Tab.Screen name="QCM" component={TestModeView}/>
  </Tab.Navigator>
  )
}

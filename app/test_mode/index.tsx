import SurveyViewApp from "@/components/SurveyView";
import React from "react";
import { Text, View } from "react-native";

export default function TestModeView() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <SurveyViewApp/>
    </View>
  );
}
import SurveyViewApp from "@/components/SurveyView";
import { SurveyProvider } from "@/context/SurveyContext";
import React from "react";
import { ScrollView, StyleSheet } from "react-native";

export default function TestModeView() {
  return (
    <SurveyProvider>
    <ScrollView contentContainerStyle={styles.container}>
      <SurveyViewApp/>
    </ScrollView>
  </SurveyProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    paddingTop: 60,
    backgroundColor: "#fff",
  },
});
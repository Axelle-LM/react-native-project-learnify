import SurveyViewApp from "@/components/SurveyView";
import { FlashcardProvider } from "@/context/FlashcardContext";
import React from "react";
import { ScrollView, StyleSheet } from "react-native";

export default function TestModeView() {
  return (
    <FlashcardProvider>
    <ScrollView contentContainerStyle={styles.container}>
      <SurveyViewApp/>
    </ScrollView>
  </FlashcardProvider>
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
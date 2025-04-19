import SwipeView from "@/components/SwipeView";
import { FlashcardProvider } from "@/context/FlashcardContext";
import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";

export default function LearningModeView() {
  return (
    <FlashcardProvider>
      <ScrollView contentContainerStyle={styles.container} decelerationRate="fast" horizontal>
        <SwipeView />
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
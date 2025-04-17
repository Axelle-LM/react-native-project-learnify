import { Link, router } from "expo-router";
import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { FlashcardProvider } from "@/context/FlashcardContext";
import FlashcardForm from "@/components/FlashcardForm";
import FlashcardList from "@/components/FlashcardList";

export default function Index() {
  return (
    <FlashcardProvider>
      <ScrollView contentContainerStyle={styles.container}>
        <FlashcardForm />
        <FlashcardList />
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
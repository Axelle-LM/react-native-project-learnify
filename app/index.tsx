import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { FlashcardProvider } from "@/context/FlashcardContext";
import FlashcardForm from "@/components/FlashcardForm";
import FlashcardList from "@/components/FlashcardList";
import { DeckProvider } from "@/context/DeckContext";
import DeckCreate from "@/components/DeckCreate";
import DeckList from "@/components/DeckList";

export default function Index() {
  return (
    <DeckProvider>
      <FlashcardProvider>
        <ScrollView contentContainerStyle={styles.container}>
          <DeckCreate />
          <DeckList />
          <FlashcardForm />
          <FlashcardList />
        </ScrollView>
      </FlashcardProvider>
    </DeckProvider>
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
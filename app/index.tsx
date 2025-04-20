import React, { useEffect } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { FlashcardProvider } from "@/context/FlashcardContext";
import FlashcardForm from "@/components/FlashcardForm";
import FlashcardList from "@/components/FlashcardList";
import { DeckProvider } from "@/context/DeckContext";
import DeckCreate from "@/components/DeckCreate";
import DeckList from "@/components/DeckList";
import NotificationPicker from "@/components/NotificationPicker";
import DeckImport from "@/components/DeckImport";

export default function Index() {
  return (
    <DeckProvider>
      <FlashcardProvider>
        <ScrollView contentContainerStyle={styles.container}>
          <NotificationPicker />
          <DeckImport />
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

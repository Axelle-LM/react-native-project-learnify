import React, { useEffect } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { FlashcardProvider } from "@/context/FlashcardContext";
import FlashcardForm from "@/components/FlashcardForm";
import FlashcardList from "@/components/FlashcardList";
import { DeckProvider } from "@/context/DeckContext";
import DeckCreate from "@/components/DeckCreate";
import DeckList from "@/components/DeckList";
import { registerForPushNotificationsAsync, scheduleRepeatingNotification } from '../utils/Notification';

export default function Index() {

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => {
      if (token) {
        console.log("Push token:", token);
        scheduleRepeatingNotification();
      }
    });
  }, []);

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
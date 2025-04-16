import React from "react";
import { Text, View } from "react-native";
import FlashcardApp from "@/components/Flashcard";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <FlashcardApp />
    </View>
  );
}

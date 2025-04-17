import SwipeView from "@/components/SwipeView";
import React from "react";
import { View, StyleSheet } from "react-native";

export default function LearningModeView() {
  return (
    <View
      style={styles.container}
    >
      <SwipeView/>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 20,
      padding: 10,
    }
});
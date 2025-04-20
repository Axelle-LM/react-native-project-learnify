import React from "react";
import { View, Text, StyleSheet } from "react-native";

const QuestionCard = (props: any) => {
        
  return (
    <View style={regularContentStyles.card}>
      <Text style={regularContentStyles.text}>{props.question}</Text>
    </View>
  );
};

const regularContentStyles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: '#b6cff7',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#001a72',
  },
  inMindButton: {
    flex: 1,
    backgroundColor: '#2df3a7',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center'
  },
  seeAgainButton: { 
    flex: 1,
    backgroundColor: '#f3552d',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default QuestionCard
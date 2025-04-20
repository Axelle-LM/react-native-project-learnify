import React from "react";
import { View, Text, StyleSheet } from "react-native";

const AnswerCard = (props: any) => {
    return (
      <View style={flippedContentStyles.card}>
        <Text style={flippedContentStyles.text}>{props.answer}</Text>
      </View>
    );
  };
  
  const flippedContentStyles = StyleSheet.create({
    card: {
      flex: 1,
      backgroundColor: '#baeee5',
      borderRadius: 16,
      justifyContent: 'center',
      alignItems: 'center',
    },
    text: {
      color: '#001a72',
    },
  });

export default AnswerCard
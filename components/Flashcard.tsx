import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type FlashcardProps = {
    name: string;
};

const Flashcard: React.FC<FlashcardProps> = ({ name }) => {
    return (
        <View>
            <Text style={styles.name}>Ce code est fait par : {name}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    name: {
        color: 'red',
        fontSize: 14,
    },
});

export default Flashcard;
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useFlashcards } from '../context/FlashcardContext';

const FlashcardForm = () => {
    const { addFlashcard } = useFlashcards();
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');

    const handleAdd = () => {
        if (!question || !answer) return;
        addFlashcard(question, answer);
        setQuestion('');
        setAnswer('');
    };

    return (
        <View>
            <Text style={styles.title}>Ajouter une carte</Text>
            <TextInput style={styles.input} placeholder="Question" value={question} onChangeText={setQuestion} />
            <TextInput style={styles.input} placeholder="Réponse" value={answer} onChangeText={setAnswer} />
            <Button title="Ajouter" onPress={handleAdd} />
        </View>
    );
};

const styles = StyleSheet.create({
    title: { fontSize: 22, marginBottom: 20 },
    input: {
        borderWidth: 1, borderColor: '#aaa', marginBottom: 10,
        padding: 8, borderRadius: 5,
    },
});

export default FlashcardForm;

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
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
        <View style={styles.container}>
            <Text style={styles.title}>Ajouter une carte</Text>
            <View style={styles.formContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Question"
                    placeholderTextColor="#666"
                    value={question}
                    onChangeText={setQuestion}
                    multiline
                />
                <TextInput
                    style={styles.input}
                    placeholder="Réponse"
                    placeholderTextColor="#666"
                    value={answer}
                    onChangeText={setAnswer}
                    multiline
                />
                <TouchableOpacity style={styles.button} onPress={handleAdd}>
                    <Text style={styles.buttonText}>Ajouter la carte</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 15,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 20,
        textAlign: 'center',
    },
    formContainer: {
        gap: 15,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 12,
        borderRadius: 8,
        fontSize: 16,
        backgroundColor: '#f8f8f8',
        minHeight: 40,
        textAlignVertical: 'center',
    },
    button: {
        backgroundColor: '#4CAF50',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default FlashcardForm;

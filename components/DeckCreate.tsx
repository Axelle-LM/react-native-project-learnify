import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useFlashcards } from '../context/FlashcardContext';
import { useDecks } from '@/context/DeckContext';

const DeckCreate = () => {
    const { addDeck } = useDecks();
    const [title, setTitle] = useState('');

    const handleAdd = () => {
        if (!title.trim()) return;
        addDeck(title);
        setTitle('');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Créer un nouveau deck</Text>
            <TextInput
                placeholder="Nom du deck"
                placeholderTextColor="#666"
                value={title}
                onChangeText={setTitle}
                style={styles.input}
            />
            <TouchableOpacity style={styles.button} onPress={handleAdd}>
                <Text style={styles.buttonText}>Créer le deck</Text>
            </TouchableOpacity>
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
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 15,
        color: '#333',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 12,
        borderRadius: 8,
        marginBottom: 15,
        fontSize: 16,
        backgroundColor: '#f8f8f8',
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

export default DeckCreate;

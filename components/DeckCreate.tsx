import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
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
            <TextInput
                placeholder="Nom du deck"
                value={title}
                onChangeText={setTitle}
                style={styles.input}
            />
            <Button title="Créer le deck" onPress={handleAdd} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { marginBottom: 20 },
    input: {
        borderWidth: 1,
        borderColor: '#aaa',
        padding: 8,
        borderRadius: 5,
        marginBottom: 10,
    },
});

export default DeckCreate;

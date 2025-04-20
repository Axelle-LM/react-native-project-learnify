import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useDecks } from '@/context/DeckContext';
import { useFlashcards } from '@/context/FlashcardContext';

const DeckImport = () => {
    const { importDeck } = useDecks();
    const { addFlashcard } = useFlashcards();

    return (
        <TouchableOpacity
            style={styles.importButton}
            onPress={() => importDeck(addFlashcard)}
        >
            <Text style={styles.importButtonText}>Importer un deck</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    importButton: {
        backgroundColor: '#4CAF50',
        padding: 10,
        borderRadius: 5,
        marginVertical: 10,
        alignItems: 'center',
    },
    importButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});

export default DeckImport; 
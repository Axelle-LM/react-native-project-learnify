import React from 'react';
import { FlatList, Text, StyleSheet } from 'react-native';
import { useFlashcards } from '../context/FlashcardContext';
import FlashcardItem from './FlashcardCard';
import FlashcardCard from './FlashcardCard';

const FlashcardList = () => {
    const { flashcards } = useFlashcards();

    return (
        <>
            <Text style={styles.cardlist}>Vos cartes</Text>
            <FlatList
                data={flashcards}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <FlashcardCard card={item} />}
            />
        </>
    );
};

const styles = StyleSheet.create({
    cardlist: {
        marginTop: 40,
        fontSize: 22,
        textAlign: 'center',
    },
});

export default FlashcardList;

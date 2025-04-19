import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useFlashcards } from '../context/FlashcardContext';
import FlashcardCard from './FlashcardCard';

const FlashcardList = () => {
    const { flashcards } = useFlashcards();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Vos cartes</Text>
            <FlatList
                data={flashcards}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.cardContainer}>
                        <FlashcardCard card={item} />
                    </View>
                )}
                contentContainerStyle={styles.listContainer}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 15,
        textAlign: 'center',
    },
    listContainer: {
        padding: 5,
    },
    cardContainer: {
        marginBottom: 10,
    },
});

export default FlashcardList;

import { useDecks } from '@/context/DeckContext';
import React from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions } from 'react-native';
import DeckOfCard from './DeckOfCard';

const DeckList = () => {
    const { decks } = useDecks();

    const numColumns = 3;
    const screenWidth = Dimensions.get('window').width;
    const itemWidth = (screenWidth - 80) / numColumns; // Augmenté la marge pour plus d'espace

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Vos decks</Text>
            <View style={styles.listWrapper}>
                <FlatList
                    data={decks}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View style={[styles.deckContainer, { width: itemWidth }]}>
                            <DeckOfCard deck={item} />
                        </View>
                    )}
                    numColumns={numColumns}
                    contentContainerStyle={styles.listContainer}
                    showsVerticalScrollIndicator={false}
                    columnWrapperStyle={styles.columnWrapper}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    listWrapper: {
        alignItems: 'center',
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
        alignItems: 'center',
    },
    columnWrapper: {
        justifyContent: 'center',
        marginBottom: 10,
    },
    deckContainer: {
        padding: 3,
        borderWidth: 1,
        borderColor: '#e0e0e0',
        borderRadius: 8,
        backgroundColor: '#f8f8f8',
        margin: 3,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
});

export default DeckList;
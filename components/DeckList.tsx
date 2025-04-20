import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import DeckOfCard from './DeckOfCard';
import DeckImport from './DeckImport';
import { useDecks } from '@/context/DeckContext';

const DeckList = () => {
    const { decks } = useDecks();

    return (
        <View style={styles.container}>
            <DeckImport />
            <FlatList
                data={decks}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <DeckOfCard deck={item} />}
                contentContainerStyle={styles.list}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    list: {
        padding: 10,
    },
});

export default DeckList;
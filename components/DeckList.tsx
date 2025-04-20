import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import DeckOfCard from './DeckOfCard';
import DeckImport from './DeckImport';
import { useDecks } from '@/context/DeckContext';

const DeckList = () => {
    const { decks } = useDecks();

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <DeckImport />
            </View>
            <FlatList
                data={decks}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <DeckOfCard deck={item} />}
                contentContainerStyle={styles.list}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        padding: 15,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3,
    },
    list: {
        flexGrow: 1,
        padding: 15,
        gap: 15,
    },
});

export default DeckList;
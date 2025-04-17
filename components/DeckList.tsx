import { useDecks } from '@/context/DeckContext';
import React from 'react';
import { FlatList, Text, StyleSheet } from 'react-native';
import DeckOfCard from './DeckOfCard';

const DeckList = () => {
    const { decks } = useDecks();

    return (
        <>
            <Text>Vos decks</Text>
            <FlatList
                data={decks}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <DeckOfCard deck={item} />}
            />
        </>
    );
};

export default DeckList;
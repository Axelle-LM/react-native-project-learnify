import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { DeckProps, useDecks } from '@/context/DeckContext';

const DeckOfCard = ({ deck }: { deck: DeckProps }) => {
    const [title, setTitle] = useState(deck.title);

    return (
        <View>
            <Text>{deck.title}</Text>
        </View>
    )
}

export default DeckOfCard;

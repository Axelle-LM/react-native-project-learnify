import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { DeckProps } from '@/context/DeckContext';
import { useFlashcards } from '@/context/FlashcardContext';

const DeckOfCard = ({ deck }: { deck: DeckProps }) => {
    const [showCards, setShowCards] = useState(false);
    const { flashcards } = useFlashcards();

    // Ne récupérer que les cartes associées au deck
    const deckCards = flashcards.filter(card => deck.cardsId.includes(card.id));

    return (
        <View>
            <TouchableOpacity onPress={() => setShowCards(!showCards)}>
                <Text>{deck.title}</Text>
            </TouchableOpacity>

            {showCards && (
                <View>
                    {deckCards.length === 0 ? (
                        <Text>Aucune carte dans ce deck.</Text>
                    ) : (
                        deckCards.map(card => (
                            <View key={card.id}>
                                <Text>Q: {card.question}</Text>
                                <Text>R: {card.answer}</Text>
                            </View>
                        ))
                    )}
                </View>
            )}
        </View>
    );
};


export default DeckOfCard;

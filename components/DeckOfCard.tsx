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
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.deckButton}
                onPress={() => setShowCards(!showCards)}
            >
                <Text style={styles.deckTitle}>{deck.title}</Text>
            </TouchableOpacity>

            {showCards && (
                <View style={styles.cardsContainer}>
                    {deckCards.length === 0 ? (
                        <Text style={styles.emptyText}>Aucune carte dans ce deck.</Text>
                    ) : (
                        deckCards.map(card => (
                            <View key={card.id} style={styles.cardItem}>
                                <Text style={styles.cardQuestion}>Q: {card.question}</Text>
                                <Text style={styles.cardAnswer}>R: {card.answer}</Text>
                            </View>
                        ))
                    )}
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    deckButton: {
        width: '100%',
        padding: 10,
        alignItems: 'center',
    },
    deckTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#333',
    },
    cardsContainer: {
        width: '100%',
        marginTop: 8,
    },
    cardItem: {
        padding: 8,
        borderTopWidth: 1,
        borderTopColor: '#eee',
    },
    cardQuestion: {
        fontSize: 14,
        fontWeight: '500',
    },
    cardAnswer: {
        fontSize: 14,
        color: '#666',
        marginTop: 2,
    },
    emptyText: {
        textAlign: 'center',
        color: '#666',
        fontStyle: 'italic',
    },
});

export default DeckOfCard;

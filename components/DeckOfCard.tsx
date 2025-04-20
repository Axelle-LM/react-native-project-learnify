import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { DeckProps } from '@/context/DeckContext';
import { useFlashcards } from '@/context/FlashcardContext';
import { useDecks } from '@/context/DeckContext';

const DeckOfCard = ({ deck }: { deck: DeckProps }) => {
    const [showCards, setShowCards] = useState(false);
    const { flashcards } = useFlashcards();
    const { exportDeck } = useDecks();

    const deckCards = flashcards.filter(card => deck.cardsId.includes(card.id)); //cartes associé au deck

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.deckButton}
                onPress={() => setShowCards(!showCards)}
            >
                <View style={styles.deckHeader}>
                    <Text style={styles.deckTitle}>{deck.title}</Text>
                    <Text style={styles.cardCount}>{deckCards.length} cartes</Text>
                </View>
            </TouchableOpacity>

            {showCards && (
                <View style={styles.cardsContainer}>
                    {deckCards.length === 0 ? (
                        <Text style={styles.emptyText}>Aucune carte dans ce deck.</Text>
                    ) : (
                        <>
                            {deckCards.map(card => (
                                <View key={card.id} style={styles.cardItem}>
                                    <Text style={styles.cardQuestion}>Q: {card.question}</Text>
                                    <Text style={styles.cardAnswer}>R: {card.answer}</Text>
                                </View>
                            ))}
                            <TouchableOpacity
                                style={styles.exportButton}
                                onPress={() => exportDeck(deck, flashcards)}
                            >
                                <Text style={styles.exportButtonText}>Exporter</Text>
                            </TouchableOpacity>
                        </>
                    )}
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginBottom: 15,
        backgroundColor: '#fff',
        borderRadius: 12,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3,
    },
    deckButton: {
        width: '100%',
        padding: 15,
    },
    deckHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    deckTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    cardCount: {
        fontSize: 14,
        color: '#666',
        backgroundColor: '#f0f0f0',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
    },
    cardsContainer: {
        padding: 15,
        borderTopWidth: 1,
        borderTopColor: '#f0f0f0',
    },
    cardItem: {
        padding: 12,
        marginBottom: 10,
        backgroundColor: '#f8f8f8',
        borderRadius: 8,
    },
    cardQuestion: {
        fontSize: 16,
        fontWeight: '500',
        color: '#333',
        marginBottom: 5,
    },
    cardAnswer: {
        fontSize: 14,
        color: '#666',
    },
    emptyText: {
        textAlign: 'center',
        color: '#666',
        fontStyle: 'italic',
        padding: 20,
    },
    exportButton: {
        backgroundColor: '#2196F3',
        padding: 12,
        borderRadius: 8,
        marginTop: 15,
        alignItems: 'center',
    },
    exportButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default DeckOfCard;

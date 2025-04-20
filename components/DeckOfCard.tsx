import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Platform } from 'react-native';
import { DeckProps } from '@/context/DeckContext';
import { useFlashcards } from '@/context/FlashcardContext';
import * as FileSystem from 'expo-file-system';

const DeckOfCard = ({ deck }: { deck: DeckProps }) => {
    const [showCards, setShowCards] = useState(false);
    const { flashcards } = useFlashcards();

    // Ne récupérer que les cartes associées au deck
    const deckCards = flashcards.filter(card => deck.cardsId.includes(card.id));

    const exportDeck = async () => {
        try {
            const deckData = {
                title: deck.title,
                cards: deckCards.map(card => ({
                    question: card.question,
                    answer: card.answer
                }))
            };

            const jsonString = JSON.stringify(deckData, null, 2);
            const fileName = `${deck.title.replace(/\s+/g, '_')}.json`;

            if (Platform.OS === 'android') {

                const permissions = await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();

                if (!permissions.granted) {
                    Alert.alert("Permission refusée", "L'accès au dossier a été refusé");
                    return;
                }

                try {

                    const fileUri = await FileSystem.StorageAccessFramework.createFileAsync( //créer fichier là ou selectionner
                        permissions.directoryUri,
                        fileName,
                        'application/json'
                    );

                    await FileSystem.writeAsStringAsync(fileUri, jsonString, { //écriture du contenu
                        encoding: FileSystem.EncodingType.UTF8
                    });

                    Alert.alert(
                        "Téléchargement réussi",
                        `Le fichier a été enregistré dans le dossier sélectionner`,
                        [{ text: "OK" }]
                    );
                } catch (error) {
                    console.error('Erreur lors de la création du fichier:', error);
                    Alert.alert(
                        "Erreur",
                        "Impossible de créer le fichier dans le dossier sélectionner",
                        [{ text: "OK" }]
                    );
                }
            } else {
                // ios
                const filePath = `${FileSystem.documentDirectory}${fileName}`;
                await FileSystem.writeAsStringAsync(filePath, jsonString);

                Alert.alert(
                    "Téléchargement réussi",
                    `Le fichier a été enregistré dans le dossier Documents`,
                    [{ text: "OK" }]
                );
            }
        } catch (error) {
            console.error('Erreur lors de l\'export du deck:', error);
            Alert.alert(
                "Erreur",
                "Erreur lors de l'export du deck",
                [{ text: "OK" }]
            );
        }
    };

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
                        <>
                            {deckCards.map(card => (
                                <View key={card.id} style={styles.cardItem}>
                                    <Text style={styles.cardQuestion}>Q: {card.question}</Text>
                                    <Text style={styles.cardAnswer}>R: {card.answer}</Text>
                                </View>
                            ))}
                            <TouchableOpacity
                                style={styles.exportButton}
                                onPress={exportDeck}
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
    exportButton: {
        backgroundColor: '#2196F3',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
        alignItems: 'center',
    },
    exportButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});

export default DeckOfCard;

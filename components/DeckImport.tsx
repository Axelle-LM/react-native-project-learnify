import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import { useDecks } from '@/context/DeckContext';
import { useFlashcards } from '@/context/FlashcardContext';

const DeckImport = () => {
    const { addDeck, cardToDeck } = useDecks();
    const { addFlashcard } = useFlashcards();

    const importDeck = async () => {
        try {
            console.log('Début de l\'importation...');

            const result = await DocumentPicker.getDocumentAsync({
                type: 'application/json',
                copyToCacheDirectory: true
            });

            if (result.canceled) {
                console.log('Importation annulée par l\'utilisateur');
                return;
            }

            const fileUri = result.assets[0].uri;
            console.log('Fichier sélectionné:', fileUri);

            const fileContent = await FileSystem.readAsStringAsync(fileUri);
            console.log('Contenu du fichier:', fileContent);

            if (!fileContent.trim()) {
                Alert.alert("Erreur", "Le fichier est vide");
                return;
            }

            let deckData;
            try {
                deckData = JSON.parse(fileContent);
                console.log('Données du deck parsées:', deckData);
            } catch (parseError) {
                console.error('Erreur de parsing JSON:', parseError);
                Alert.alert("Erreur", "Le fichier n'est pas un JSON valide");
                return;
            }

            if (!deckData.title || !Array.isArray(deckData.cards)) {
                Alert.alert("Erreur", "Le fichier doit contenir un titre et un tableau de cartes");
                return;
            }

            const newDeckId = Date.now().toString();
            console.log('Création du deck avec ID:', newDeckId);
            addDeck(deckData.title);

            for (const card of deckData.cards) {
                if (card.question && card.answer) {
                    console.log('Ajout de la carte:', card);
                    const newCardId = addFlashcard(card.question, card.answer); //crée carte avec id
                    if (newCardId) {
                        console.log('Carte créée avec ID:', newCardId);
                        cardToDeck(newDeckId, newCardId); //mettre carte dans deck
                        console.log('Carte associée au deck');
                    }
                }
            }

            Alert.alert("Succès", "Le deck a été importé avec succès");
        } catch (error) {
            console.error('Erreur détaillée lors de l\'import du deck:', error);
            Alert.alert("Erreur", "Une erreur est survenue lors de l'import du deck");
        }
    };

    return (
        <TouchableOpacity
            style={styles.importButton}
            onPress={importDeck}
        >
            <Text style={styles.importButtonText}>Importer un deck</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    importButton: {
        backgroundColor: '#4CAF50',
        padding: 10,
        borderRadius: 5,
        marginVertical: 10,
        alignItems: 'center',
    },
    importButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});

export default DeckImport; 
import React, { PropsWithChildren, createContext, useContext, useState } from 'react';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import { Alert, Platform } from 'react-native';

export type DeckProps = {
    id: string,
    title: string,
    cardsId: string[],
};

const DeckContext = createContext<{
    id: string, title: string, error: string | null, setId: (id: string) => void, setTitle: (title: string) => void, decks: DeckProps[], addDeck: (title: string) => string, cardToDeck: (deckId: string, cardId: string) => void, importDeck: (addFlashcard: (question: string, answer: string) => string) => Promise<void>, exportDeck: (deck: DeckProps, flashcards: { id: string, question: string, answer: string }[]) => Promise<void>
}>({
    id: " ", title: " ", error: null, setId: () => { }, setTitle: () => { }, decks: [], addDeck: () => "", cardToDeck: () => { }, importDeck: async () => { }, exportDeck: async () => { }
})

export const DeckProvider = ({ children }: PropsWithChildren) => {
    const [decks, setDecks] = useState<DeckProps[]>([]);
    const [id, setId] = useState('');
    const [title, setTitle] = useState('');
    const [error, setError] = useState<string | null>(null);

    const addDeck = (title: string) => {
        const newDeck: DeckProps = {
            id: Date.now().toString(),
            title,
            cardsId: [],
        };
        setDecks((prev) => [newDeck, ...prev]);
        setTitle('');
        return newDeck.id;
    };

    const cardToDeck = (deckId: string, cardId: string) => {
        setDecks((prev) =>
            prev.map((deck =>
                deck.id === deckId ? { ...deck, cardsId: [...new Set([...deck.cardsId, cardId])] }
                    : deck
            )
            )
        );
    }

    const importDeck = async (addFlashcard: (question: string, answer: string) => string) => {
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

            const deckId = addDeck(deckData.title);
            console.log('Deck créé avec ID:', deckId);

            for (const card of deckData.cards) {
                if (card.question && card.answer) {
                    console.log('Ajout de la carte:', card);
                    const newCardId = addFlashcard(card.question, card.answer); //crée carte avec id
                    if (newCardId) {
                        console.log('Carte créée avec ID:', newCardId);
                        cardToDeck(deckId, newCardId);
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

    const exportDeck = async (deck: DeckProps, flashcards: { id: string, question: string, answer: string }[]) => {
        try {
            const deckCards = flashcards.filter(card => deck.cardsId.includes(card.id));
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
                    const fileUri = await FileSystem.StorageAccessFramework.createFileAsync(
                        permissions.directoryUri,
                        fileName,
                        'application/json'
                    );

                    await FileSystem.writeAsStringAsync(fileUri, jsonString, {
                        encoding: FileSystem.EncodingType.UTF8
                    });

                    Alert.alert(
                        "Téléchargement réussi",
                        `Le fichier a été enregistré dans le dossier sélectionné`,
                        [{ text: "OK" }]
                    );
                } catch (error) {
                    console.error('Erreur lors de la création du fichier:', error);
                    Alert.alert(
                        "Erreur",
                        "Impossible de créer le fichier dans le dossier sélectionné",
                        [{ text: "OK" }]
                    );
                }
            } else {
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
        <DeckContext.Provider value={{ id, title, error, setId, setTitle, decks, addDeck, cardToDeck, importDeck, exportDeck }}>
            {children}
        </DeckContext.Provider>
    );
}

export const useDecks = () => useContext(DeckContext)
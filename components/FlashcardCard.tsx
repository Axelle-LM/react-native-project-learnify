import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { FlashcardProps, useFlashcards } from '../context/FlashcardContext';
import { useDecks } from '@/context/DeckContext';
import DeckPicker from './DeckPicker';


const FlashcardCard = ({ card }: { card: FlashcardProps }) => {
    const { deleteFlashcard, editCard } = useFlashcards();
    const [isEditing, setIsEditing] = useState(false);
    const [question, setQuestion] = useState(card.question);
    const [answer, setAnswer] = useState(card.answer);
    const [modalVisible, setModalVisible] = useState(false);
    const { cardToDeck } = useDecks();

    const handleSave = () => {
        editCard(card.id, question, answer);
        setIsEditing(false);
    };

    return (
        <View style={styles.card}>
            {isEditing ? (
                <>
                    <TextInput style={styles.input} value={question} onChangeText={setQuestion} />
                    <TextInput style={styles.input} value={answer} onChangeText={setAnswer} />
                    <Button title="Enregistrer" onPress={handleSave} color="green" />
                </>
            ) : (
                <>
                    <Text style={styles.question}>Question : {card.question}</Text>
                    <Text style={styles.answer}>Réponse : {card.answer}</Text>
                    <Button title="Supprimer" onPress={() => deleteFlashcard(card.id)} color="#ff4d4d" />
                    <Button title="Modifier" onPress={() => setIsEditing(true)} color="green" />
                    <Button title="Ajouter à un deck" onPress={() => setModalVisible(true)} />

                    <DeckPicker
                        visible={modalVisible}
                        onClose={() => setModalVisible(false)}
                        onSelect={(deckId) => cardToDeck(deckId, card.id)}
                    />
                </>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#f8f8f8',
        padding: 15,
        marginVertical: 8,
        borderRadius: 8,
    },
    question: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    answer: {
        fontSize: 14,
        marginTop: 5,
        textAlign: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: '#aaa',
        marginBottom: 10,
        padding: 8,
        borderRadius: 5,
    },
});

export default FlashcardCard;

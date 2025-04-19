import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
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
                    <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                        <Text style={styles.buttonText}>Enregistrer</Text>
                    </TouchableOpacity>
                </>
            ) : (
                <>
                    <View style={styles.contentContainer}>
                        <Text style={styles.question}>Question : {card.question}</Text>
                        <Text style={styles.answer}>Réponse : {card.answer}</Text>
                    </View>
                    <View style={styles.buttonsContainer}>
                        <TouchableOpacity
                            style={[styles.button, styles.deleteButton]}
                            onPress={() => deleteFlashcard(card.id)}
                        >
                            <Text style={styles.buttonText}>Supprimer</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.button, styles.editButton]}
                            onPress={() => setIsEditing(true)}
                        >
                            <Text style={styles.buttonText}>Modifier</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.button, styles.addToDeckButton]}
                            onPress={() => setModalVisible(true)}
                        >
                            <Text style={styles.buttonText}>Ajouter</Text>
                        </TouchableOpacity>
                    </View>
                </>
            )}

            <DeckPicker
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                onSelect={(deckId) => cardToDeck(deckId, card.id)}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#f8f8f8',
        padding: 15,
        marginVertical: 8,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#e0e0e0',
    },
    contentContainer: {
        marginBottom: 15,
    },
    question: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 5,
    },
    answer: {
        fontSize: 14,
        color: '#666',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 8,
        borderRadius: 5,
        marginBottom: 10,
        backgroundColor: '#fff',
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    button: {
        padding: 8,
        borderRadius: 5,
        alignItems: 'center',
        flex: 1,
        marginHorizontal: 5,
    },
    deleteButton: {
        backgroundColor: '#ff4d4d',
    },
    editButton: {
        backgroundColor: '#4CAF50',
    },
    addToDeckButton: {
        backgroundColor: '#2196F3',
    },
    saveButton: {
        backgroundColor: '#4CAF50',
        padding: 8,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
    },
});

export default FlashcardCard;

import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';

type FlashcardProps = {
    id: string,
    question: string,
    answer: string,
};

const FlashcardApp = () => {
    const [flashcards, setFlashcards] = useState<FlashcardProps[]>([]);
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');

    const [editCardId, setEditCardId] = useState<string | null>(null);
    const [editQuestion, setEditQuestion] = useState('');
    const [editAnswer, setEditAnswer] = useState('');

    const addFlashcard = () => {
        if (!question || !answer) return;
        const newCard: FlashcardProps = {
            id: Date.now().toString(),
            question,
            answer,
        };
        setFlashcards((prev) => [newCard, ...prev]);
        setQuestion('');
        setAnswer('');
    };

    const deleteFlashcard = (id: string) => {
        setFlashcards((prev) => prev.filter(card => card.id !== id));
    };

    const editCard = (card: FlashcardProps) => { //va chercher les valeurs de ma carte sélectionné
        setEditCardId(card.id);
        setEditQuestion(card.question);
        setEditAnswer(card.answer);
    };

    const saveEdit = (id: string) => { //mets à jour mes valeurs
        setFlashcards((prev) =>
            prev.map(card =>
                card.id === id ? { ...card, question: editQuestion, answer: editAnswer } : card
            )
        );
        setEditCardId(null);
        setEditQuestion('');
        setEditAnswer('');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Ajouter une carte</Text>
            <TextInput style={styles.input} placeholder="Question" value={question} onChangeText={setQuestion} />
            <TextInput style={styles.input} placeholder="Réponse" value={answer} onChangeText={setAnswer} />
            <Button title="Ajouter" onPress={addFlashcard} />

            <Text style={styles.cardlist}>Vos cartes</Text>

            <FlatList
                data={flashcards}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        {editCardId === item.id ? (
                            <View>
                                <TextInput
                                    style={styles.input}
                                    value={editQuestion}
                                    onChangeText={setEditQuestion}
                                />
                                <TextInput
                                    style={styles.input}
                                    value={editAnswer}
                                    onChangeText={setEditAnswer}
                                />
                                <Button title="Enregistrer" onPress={() => saveEdit(item.id)} color="green" />
                            </View>
                        ) : (
                            <View>
                                <Text style={styles.question}>Question : {item.question}</Text>
                                <Text style={styles.answer}>Réponse : {item.answer}</Text>
                                <Button title="Supprimer" onPress={() => deleteFlashcard(item.id)} color="#ff4d4d" />
                                <Button title="Modifier" onPress={() => editCard(item)} color="green" />
                            </View>
                        )}
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        padding: 10,
    },
    title: {
        fontSize: 22,
        marginBottom: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#aaa',
        marginBottom: 10,
        padding: 8,
        borderRadius: 5,
    },
    cardlist: {
        marginTop: 40,
        fontSize: 22,
        textAlign: 'center',
    },
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
});

export default FlashcardApp;

import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, TouchableOpacity } from 'react-native';

type FlashcardProps = {
    id: string,
    question: string,
    answer: string,
};

const Flashcard = ({ question, answer, onDelete }: FlashcardProps & { onDelete: () => void }) => {
    return (
        <View style={styles.card}>
            <Text style={styles.question}>Question : {question}</Text>
            <Text style={styles.answer}>Réponse : {answer}</Text>
            <Button title="Supprimer" onPress={onDelete} color="#ff4d4d" />
        </View>
    );
};

const FlashcardApp = () => {
    const [flashcards, setFlashcards] = useState<FlashcardProps[]>([]);
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');

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

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Ajouter une carte</Text>
            <TextInput style={styles.input} placeholder="Question" value={question} onChangeText={setQuestion}
            />
            <TextInput style={styles.input} placeholder="Réponse" value={answer} onChangeText={setAnswer}
            />
            <Button title="Ajouter" onPress={addFlashcard} />

            <Text style={styles.cardlist}>Vos cartes</Text>

            <FlatList data={flashcards} keyExtractor={(item) => item.id} renderItem={({ item }) => (
                <Flashcard question={item.question} answer={item.answer} id={item.id}
                    onDelete={() => deleteFlashcard(item.id)}
                />
            )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
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
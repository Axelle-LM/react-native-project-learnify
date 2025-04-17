import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, ScrollView } from 'react-native';

type FlashcardProps = {
    id: string,
    question: string,
    answer: string,
};

const question1: FlashcardProps = {
    id: "1",
    question: "question 1",
    answer: "first_answer",
};

const question2: FlashcardProps = {
    id: "2",
    question: "question 2",
    answer: "second_answer",
};

const question3: FlashcardProps = {
    id: "3",
    question: "question 3",
    answer: "third_answer",
};

const SwipeViewApp = () => {
    const [flashcards, setFlashcards] = useState<FlashcardProps[]>([]);

    // const [editCardId, setEditCardId] = useState<string | null>(null);

    const [inMindAlreadyCards, setInMindAlreadyCards] = useState<FlashcardProps[]>([])

    const [seeAgainCards, setSeeAgainCards] = useState<FlashcardProps[]>([])

    const addInMindCard = (flashcard: FlashcardProps) => {
        if (!flashcard) return;
        setInMindAlreadyCards((prev) => [flashcard, ...prev])
    };

    const addSeeAgainCard = (flashcard: FlashcardProps) => {
        if (!flashcard) return;
        setSeeAgainCards((prev) => [flashcard, ...prev])
    };

    const getFlashCards = () => {
        if (!flashcards) return;
        setFlashcards([question1, question2, question3])
    };

    useEffect(() => {
        getFlashCards()
    }, [])

    console.log("In Mind Cards", inMindAlreadyCards)

    console.log("See Again Cards", seeAgainCards)

    // const deleteFlashcard = (id: string) => {
    //     setFlashcards((prev) => prev.filter(card => card.id !== id));
    // };

    // const set = (card: FlashcardProps) => { //va chercher les valeurs de ma carte sélectionné
    //     setEditCardId(card.id);
    // };

    return (
        <>
            $<FlatList data={flashcards} renderItem={({ item }) => (
                    <View style={styles.card}>
                        <Text style={styles.question}>Question : {item.question}</Text>
                        <Text style={styles.answer}>Réponse : {item.answer}</Text>
                        <Button title="Connu" onPress={() => addInMindCard(item)} color="green" />
                        <Button title="A revoir" onPress={() => addSeeAgainCard(item)} color="#ff4d4d" />
                    </View>
                )}
            />
        </>
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
    }
});

export default SwipeViewApp;
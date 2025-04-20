import React, { createContext, useState, PropsWithChildren, useContext, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type FlashcardProps = {
    id: string,
    question: string,
    answer: string,
};

const FLASHCARDS_STORAGE_KEY = '@flashcards';

const FlashcardContext = createContext<{
    id: string, question: string, answer: string, error: string | null, setId: (id: string) => void, setQuestion: (q: string) => void, setAnswer: (a: string) => void, addFlashcard: (question: string, answer: string) => string, deleteFlashcard: (id: string) => void, editCard: (id: string, question: string, answer: string) => void, inMindAlreadyCards: FlashcardProps[], addInMindCard: (flashcard: FlashcardProps) => void, seeAgainCards: FlashcardProps[], addSeeAgainCard: (flashcard: FlashcardProps) => void, flashcards: FlashcardProps[]
}>({ id: " ", question: " ", answer: " ", error: null, setId: () => { }, setQuestion: () => { }, setAnswer: () => { }, addFlashcard: () => "", deleteFlashcard: () => { }, editCard: () => { }, inMindAlreadyCards: [], addInMindCard: () => { }, seeAgainCards: [], addSeeAgainCard: () => { }, flashcards: [] })

export const FlashcardProvider = ({ children }: PropsWithChildren) => {
    const [flashcards, setFlashcards] = useState<FlashcardProps[]>([]);
    const [id, setId] = useState('');
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [inMindAlreadyCards, setInMindAlreadyCards] = useState<FlashcardProps[]>([])
    const [seeAgainCards, setSeeAgainCards] = useState<FlashcardProps[]>([])

    useEffect(() => { //démarrage récup flashcard
        const loadFlashcards = async () => {
            try {
                const storedFlashcards = await AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY);
                if (storedFlashcards) {
                    setFlashcards(JSON.parse(storedFlashcards));
                }
            } catch (error) {
                console.error('Erreur lors du chargement des flashcards:', error);
            }
        };
        loadFlashcards();
    }, []);

    useEffect(() => {
        const saveFlashcards = async () => {
            try {
                await AsyncStorage.setItem(FLASHCARDS_STORAGE_KEY, JSON.stringify(flashcards));
            } catch (error) {
                console.error('Erreur lors de la sauvegarde des flashcards:', error);
            }
        };
        saveFlashcards();
    }, [flashcards]);

    const addFlashcard = (question: string, answer: string) => {
        if (!question || !answer) return "";
        const newCard: FlashcardProps = {
            id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
            question,
            answer,
        };
        setFlashcards((prev) => [newCard, ...prev]);
        setQuestion('');
        setAnswer('');
        setError(null);
        return newCard.id;
    };

    const deleteFlashcard = (id: string) => {
        setFlashcards((prev) => prev.filter(card => card.id !== id));
    };

    const editCard = (id: string, question: string, answer: string) => { //va chercher les valeurs de ma carte sélectionné
        setFlashcards((prev) =>
            prev.map((card) =>
                card.id === id ? { ...card, question, answer } : card
            )
        );
    };

    const addInMindCard = (flashcard: FlashcardProps) => {
        if (!flashcard) return;
        setInMindAlreadyCards((prev) => [flashcard, ...prev])
    };

    const addSeeAgainCard = (flashcard: FlashcardProps) => {
        if (!flashcard) return;
        setSeeAgainCards((prev) => [flashcard, ...prev])
    };

    return (
        <FlashcardContext.Provider value={{ id, question, answer, error, setId, setQuestion, setAnswer, flashcards, addFlashcard, deleteFlashcard, editCard, inMindAlreadyCards, addInMindCard, seeAgainCards, addSeeAgainCard }}>
            {children}
        </FlashcardContext.Provider>
    );
}

export const useFlashcards = () => useContext(FlashcardContext)


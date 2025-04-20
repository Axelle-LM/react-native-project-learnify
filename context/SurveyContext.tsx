import React, { createContext, useState, PropsWithChildren, useContext, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import { DeckProps } from './DeckContext';
import { useSharedValue } from 'react-native-reanimated';
import { FlashcardProps } from './FlashcardContext';

type SurveyAnswer = {
    value: number,
    title: string,
    wrong: boolean,
    right: boolean
}

type SurveyCardProps = {
    id: string,
    question: string,
    answers: SurveyAnswer[]
};

type SurveySession = {
    id: string,
    deck_id: string | null,
    correct_answers: number, 
    total_questions: number,
    created_at: string
}

const SurveyContext = createContext<{
    deck: DeckProps | null, surveyContent: SurveyCardProps[], getFlashCards: () => void, selectAnswer: (answer: SurveyAnswer) => void, getStats: (selectedAnswers: SurveyAnswer[]) => void, selectedAnswers: SurveyAnswer[], syncCurrentSession: (session: SurveySession) => void, rightAnswers: SurveyAnswer[], wrongAnswers: SurveyAnswer[], wrongPercent: number, rightPercent: number, lastResult: number, lastSession: SurveySession | null, flashcards: FlashcardProps[]
}>({ deck: null, surveyContent: [], selectAnswer: () => { }, getStats: () => { }, getFlashCards: () => { }, selectedAnswers: [], syncCurrentSession: () => { }, rightAnswers: [], wrongAnswers: [], wrongPercent: 0, rightPercent: 0, lastResult: 0, lastSession: null, flashcards: [] })

export const SurveyProvider = ({ children }: PropsWithChildren) => {
    const flashcards: FlashcardProps[] = [{
            id: "1",
            question: "Quel est la capitale de la France ?",
            answer: "Paris",
        },
        {
            id: "2",
            question: "Qui était Louis XIV ?",
            answer: "Un roi",
        },
        {
            id: "3",
            question: "C'est quoi l'ONU ?",
            answer: "Organisation des Nation Unies",
        }]  // Exemples de data de flashcard en guise de test pour simulation avec tableau flashcards de useFlashcards()
        
        const deck: DeckProps = {
            id: "2",
            title: "Histoire-Géo",
            cardsId: flashcards.map((flashcard) => flashcard.id)
        } // Exemples de data d'une deck en guise de test pour simulation avec une deck du tableau decks de useFlashcards(), le contenu de cardId ne contiendra pas forécement toutes les cards de flashcards mais on les laisse en guise d'exemples
    
        const [surveyContent, setSurveyContent] = useState<SurveyCardProps[]>([])
        const [selectedAnswers, setSelectedAnswers] = useState<SurveyAnswer[]>([])
    
        const [rightAnswers, setRightAnswers] = useState<SurveyAnswer[]>([])
        const [wrongAnswers, setWrongAnswers] = useState<SurveyAnswer[]>([])
    
        const [allSessions, setAllSessions] = useState<SurveySession[]>([{
            id: "aB3cD4Ef-12Xy-Z9Lm-N0Op-qrstUvWxYZ12",
            deck_id: null,
            correct_answers: 4, 
            total_questions: 6,
            created_at: "2024-04-10"
        }])
    
        
    async function getWrongAnswer(question: string): Promise<string | null> {
    
        try {
            const response = await fetch('https://cheapest-gpt-4-turbo-gpt-4-vision-chatgpt-openai-ai-api.p.rapidapi.com/v1/chat/completions', 
                {
                    method: 'POST',
                    headers: {
                        'x-rapidapi-key': '5279274116mshfb09f8d31d5c9e4p18d144jsn5da42cdeb7c7',
                        'x-rapidapi-host': 'cheapest-gpt-4-turbo-gpt-4-vision-chatgpt-openai-ai-api.p.rapidapi.com',
                        'Content-Type': 'application/json'
        },
                    body: JSON.stringify({
                        model: 'o1-mini-2024-09-12',
                        messages: [
                            {
                                role: 'user',
                                content: `Peux-tu me donner une mauvaise réponse très courte et assez difficile pour trouver la bonne réponse pour cette question sans phrase d'introduction : ${question}`
                            }
                        ],
                        "max_tokens": 100,
                        "temperature": 0.9
                    })
                }
            );
            const result = await response.json();
            return result.choices[0].message.text
    
        } catch (error) {
            console.error("Erreur lors de l'appel à l'API :", error);
            return null;
        }
    }
    
        const getFlashCards = () => {
            if (!flashcards) return;
            const currentFlashCards: SurveyCardProps[] = flashcards.map((flashcard: FlashcardProps) => ({
                id: flashcard.id,
                question: flashcard.question,
                answers: [
                    { value: 1, title: flashcard.answer, wrong: false, right: true },
                    { 
                        value: 2, 
                        title: getWrongAnswer(flashcard.question).then((wrongAnswer) => {
                            return wrongAnswer
                        }),
                        wrong: true, 
                        right: false
                    },
                    {
                        value: 3, 
                        title: getWrongAnswer(flashcard.question).then((wrongAnswer) => {
                            return wrongAnswer
                        }),
                        wrong: true,
                        right: false 
                    }
                ],
            }));
            
            setSurveyContent(currentFlashCards);
        };
    
        const selectAnswer = (answer: SurveyAnswer) => {
            if (!answer) return;
            setSelectedAnswers((prev) => [...prev, answer])
        };
    
        const lastSession = allSessions[allSessions.length - 1]
        const lastResult = (lastSession.correct_answers * 100) / lastSession.total_questions
        
        const syncCurrentSession = (session: SurveySession) => {
                if (!session) return;
                setAllSessions((prev) => [...prev, session])
            };
    
        const getStats = (selectedAnswers: SurveyAnswer[]) => {
    
            surveyContent.forEach((allAnswers) => {
    
                for (let i = 0; i < selectedAnswers.length; i++) {
                    
                    const matchedAnswer = allAnswers.answers.find(
                        (answer) => answer.title === selectedAnswers[i].title
                    );
        
                    if (matchedAnswer?.right) {
                        setRightAnswers((prev) => [...prev, selectedAnswers[i]]);
                    } else if (matchedAnswer?.wrong) {
                        setWrongAnswers((prev) => [...prev, selectedAnswers[i]]);
                    }
    
                }
    
            });
        
        };
    
        const rightPercent = (rightAnswers.length * 100) / surveyContent.length
        const wrongPercent = (wrongAnswers.length * 100) / surveyContent.length

    return (
        <SurveyContext.Provider value={{ deck, surveyContent, selectAnswer, getStats, getFlashCards, selectedAnswers, syncCurrentSession, rightAnswers, wrongAnswers, wrongPercent, rightPercent, lastResult, lastSession, flashcards }}>
            {children}
        </SurveyContext.Provider>
    );
}

export const useSurvey = () => useContext(SurveyContext)
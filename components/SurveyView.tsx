import SessionsInfos from '@/components/SessionInfos';
import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';
import SurveyStatsView from './SurveyStats';
import { generateUUID } from '@/utils/uuidGeneration';
import SurveyCard from './SurveyCard';
import { useSurvey } from '@/context/SurveyContext';

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

const SurveyViewApp = () => {

    // En guise d'exemple flashcard a été ajouté avec les autres éléments lié à cette view mais l'idée était d'utiliser flashcard de useFlashCards() pour le mode apprentissage avec toutes les flashcards
    let {deck, surveyContent, selectAnswer, getFlashCards, selectedAnswers, getStats, syncCurrentSession, rightAnswers, rightPercent, wrongAnswers, wrongPercent, lastSession, lastResult } = useSurvey()

    useEffect(() => {
                getFlashCards()
            }, [])
            
  const isOpen = useSharedValue(false);

  const toggleSheet = () => {
    isOpen.value = !isOpen.value;
  };

    return (
        <>
            <View>
                <Text>Test autour du thème {deck?.title}</Text>
                <Button title='Consulter mes derniers résultats' onPress={toggleSheet}/> 
            </View>
            $<FlatList style={{flexDirection: "row"}} data={surveyContent} renderItem={({ item }) => (
                <SurveyCard question={item.question} answers={item.answers} id={item.id}
                answerSelection={selectAnswer}
                />
            )}
            />
            <Button title="Envoyer" onPress={() => {
                getStats(selectedAnswers); 
                syncCurrentSession({
                    id: generateUUID(),
                    deck_id: deck?.id !== null ? `${deck?.id}` : null,
                    correct_answers: rightAnswers.length, 
                    total_questions: surveyContent.length,
                    created_at: Date.now().toString()
                })
            }} color="#ff4d4d" />
            <SurveyStatsView questionTotal={surveyContent.length} wrongAnswersCount={wrongAnswers.length} wrongAnswersPercent={Number.isNaN(wrongPercent) ? 0 : Math.round(wrongPercent)} rightAnswersCount={rightAnswers.length} rightAnswersPercent={Number.isNaN(rightPercent) ? 0 : Math.round(rightPercent)}/>
            <SessionsInfos isOpen={isOpen} toggleSheet={toggleSheet} rightPercent={Math.round(lastResult)} questionTotal={lastSession?.total_questions} lastDate={lastSession?.created_at}/>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
    },
    card: {
        backgroundColor: '#f8f8f8',
        padding: 15,
        marginVertical: 8,
        borderRadius: 8,
        overflow: "hidden",
        maxWidth: 500
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
    answserContainer: {
        flexDirection: 'row',
    },
    checkbox: {
        alignSelf: 'center',
    },
    answsersCountCard: {
        backgroundColor: '#f8f8f8',
        padding: 15,
        marginVertical: 8,
        borderRadius: 8,
        flex: 2,
    },
    rightAnswsersCount: {
        color: "green"
    },
    wrongAnswsersCount: {
        color: "red"
    },
    cardText: {
        color: '#fff',
        fontSize: 12,
        textAlign: 'center',
    },
});

export default SurveyViewApp;

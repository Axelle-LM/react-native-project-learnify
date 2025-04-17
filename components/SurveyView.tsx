import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

type FlashcardProps = {
    id: string,
    question: string,
    answer: string,
};

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

type SurveyStats = {
    rightAnswersCount: number,
    wrongAnswersCount: number
};

const SurveyCard = ({ question, answers, id, allSelectedAnswers, answerSelection }: SurveyCardProps & { allSelectedAnswers: SurveyAnswer[] } & { answerSelection: (answer: number) => void }) => {
    return (
        <View style={styles.card} key={id} >
            <Text style={styles.question}>{question}</Text>
            <Text style={styles.answer}>Réponses :</Text>
            {answers.map((answer) => {
                return(
                    <>
                        <View style={styles.answserContainer}>
                            <Button title='I choose this answer' onPress={() => answerSelection(allSelectedAnswers.push(answer))} color="orange"/>
                            <Text style={styles.answer}>{answer.title}</Text>
                        </View>
                    </>
                )
            } )}
        </View>
    );
};

const SurveyStatsView = ({ rightAnswersCount, wrongAnswersCount }: SurveyStats) => {
    return (
        <><View style={styles.answsersCountCard}>
            <View style={styles.card}>
                <Text style={styles.question}>Nombres de bonnes réponses</Text>
                <Text style={styles.rightAnswsersCount}>{rightAnswersCount}</Text>
            </View>
        </View>
        <View style={styles.answsersCountCard}>
            <View style={styles.card}>
                <Text style={styles.question}>Nombres de mauvaises réponses</Text>
                <Text style={styles.rightAnswsersCount}>{wrongAnswersCount}</Text>
            </View>
        </View></>
    );
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

const SurveyViewApp = () => {
    const [flashcards, setFlashcards] = useState<FlashcardProps[]>([])
    const [surveyContent, setSurveyContent] = useState<SurveyCardProps[]>([])
    const [selectedAnswers, setSelectedAnswers] = useState<SurveyAnswer[]>([])
    const [rightAnswersPercent, setRightAnswersPercent] = useState<number>(0)
    const [wrongAnswersPercent, setWrongAnswersPercent] = useState<number>(0)

    const [rightAnswers, setRightAnswers] = useState<SurveyAnswer[]>([])
    const [wrongAnswers, setWrongAnswers] = useState<SurveyAnswer[]>([])

    const getFlashCards = () => {
        setFlashcards([question1, question2, question3])
        if (!flashcards) return;
        const currentFlashCards: SurveyCardProps[] = flashcards.map((flashcard: FlashcardProps) => {
            return {
                id: flashcard.id, 
                question: flashcard.question,
                answers: [
                {
                    value: 1,
                    title: flashcard.answer,
                    wrong: false,
                    right: true
                },
                {
                    value: 2,
                    title: "Wrong answer 2",
                    wrong: true,
                    right: false
                },
                {
                    value: 3,
                    title: "Wrong answer 3",
                    wrong: true,
                    right: false
                },
                ]
            }
        });
        setSurveyContent(currentFlashCards)
    };

    const getStats = (surveyContent: SurveyCardProps[], selectedAnswers: SurveyAnswer[]) => {
        for (let i = 0; i < surveyContent.length; i++) {

            for (let j = 0; j < surveyContent[i].answers.length; j++) {

                const answers = surveyContent[i].answers

                for (let k = 0; k < selectedAnswers.length; k++) {

                    if(answers[j].right === true && selectedAnswers[k].value === answers[j].value) {
                        setRightAnswers((prev) => [selectedAnswers[k], ...prev])
                    } else if (answers[j].wrong === true && selectedAnswers[k].value === answers[j].value){
                        setWrongAnswers((prev) => [selectedAnswers[k], ...prev])
                    }

                }

            }

        }
    }

    useEffect(() => {
        getFlashCards()
    }, [])

    return (
        <>
            $<FlatList data={surveyContent} renderItem={({ item }) => (
                <SurveyCard question={item.question} answers={item.answers} id={item.id}
                allSelectedAnswers={selectedAnswers}
                answerSelection={() => setSelectedAnswers}
                />
            )}
            />
            <Button title="Envoyer" onPress={() => getStats(surveyContent, selectedAnswers)} color="#ff4d4d" />
            <SurveyStatsView wrongAnswersCount={wrongAnswers.length} rightAnswersCount={rightAnswers.length}/>
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
    }
});

export default SurveyViewApp;
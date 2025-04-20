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
    questionTotal: number,
    rightAnswersCount: number,
    wrongAnswersCount: number,
    rightAnswersPercent: number,
    wrongAnswersPercent: number
};

const SurveyCard = ({ 
    question, 
    answers, 
    id, 
    answerSelection 
}: SurveyCardProps & { 
    answerSelection: (answer: SurveyAnswer) => void 
}) => {
    return (
        <View style={styles.card} key={id}>
            <Text style={styles.question}>{question}</Text>
            <Text style={styles.answer}>Réponses :</Text>
            <FlatList 
                data={answers} 
                renderItem={({ item }) => (
                    <View style={styles.answserContainer}>
                        <Text style={styles.answer}>{item.title}</Text>
                        <Button 
                            title="I choose this answer" 
                            onPress={() => answerSelection(item)} 
                            color="orange" 
                        />
                    </View>
                )}
            />
        </View>
    );
};

const SurveyStatsView = ({ questionTotal, rightAnswersCount, wrongAnswersCount, rightAnswersPercent, wrongAnswersPercent }: SurveyStats) => {
    return (
        <><View style={styles.answsersCountCard}>
            <View style={styles.card}>
                <Text style={styles.question}>Score du test</Text>
                <Text style={styles.rightAnswsersCount}>{rightAnswersCount}/{questionTotal}</Text>
            </View>
        </View>
        <View style={styles.answsersCountCard}>
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
        </View>
        <View style={styles.answsersCountCard}>
            <View style={styles.card}>
                <Text style={styles.question}>Pourcentage de bonnes réponses</Text>
                <Text style={styles.rightAnswsersCount}>{rightAnswersPercent}%</Text>
            </View>
        </View>
        <View style={styles.answsersCountCard}>
            <View style={styles.card}>
                <Text style={styles.question}>Pourcentage de mauvaises réponses</Text>
                <Text style={styles.rightAnswsersCount}>{wrongAnswersPercent}%</Text>
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

    function generateRandomString(length: number) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let randomString = '';
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            randomString += characters[randomIndex];
        }
        return randomString;
    }

    const getFlashCards = () => {
        setFlashcards([question1, question2, question3]);
        if (!flashcards) return;
        const currentFlashCards: SurveyCardProps[] = flashcards.map((flashcard: FlashcardProps) => ({
            id: flashcard.id,
            question: flashcard.question,
            answers: [
                { value: 1, title: flashcard.answer, wrong: false, right: true },
                { value: 2, title: generateRandomString(5), wrong: true, right: false },
                { value: 3, title: generateRandomString(5), wrong: true, right: false },
            ],
        }));
        setSurveyContent(currentFlashCards);
    };

    const selectAnswer = (answer: SurveyAnswer) => {
        if (!answer) return;
        setSelectedAnswers((prev) => [answer, ...prev])
    };

    const getStats = (selectedAnswers: SurveyAnswer[]) => {

        surveyContent.forEach((allAnswers) => {

            for (let i = 0; i < selectedAnswers.length; i++) {
                
                const matchedAnswer = allAnswers.answers.find(
                    (answer) => answer.title === selectedAnswers[i].title
                );
    
                if (matchedAnswer?.right) {
                    setRightAnswers((prev) => [selectedAnswers[i], ...prev]);
                } else if (matchedAnswer?.wrong) {
                    setWrongAnswers((prev) => [selectedAnswers[i], ...prev]);
                }

            }

            // Mise à jour des pourcentages
        const totalQuestions = surveyContent.length
        const rightPercent = (rightAnswers.length / totalQuestions) * 100
        const wrongPercent = (wrongAnswers.length / totalQuestions) * 100

        setRightAnswersPercent(rightPercent);
        setWrongAnswersPercent(wrongPercent);

        });
        
    };

    console.log("Réponses sélectionnés", selectedAnswers)
    console.log(`Nombres de bonnes réponses: ${rightAnswers.length}`)
    console.log(`Tableau des bonnes réponses: ${rightAnswers}`)
    console.log(`Nombres de mauvaises réponses: ${wrongAnswers.length}`)
    console.log(`Tableau des mauvaises réponses: ${wrongAnswers}`)
    
    useEffect(() => {
        getFlashCards()
    }, [])

    console.log("Pourcentage bonnes réponses :", `${rightAnswersPercent}%`)
    console.log("Pourcentage mauvaises réponses :", `${wrongAnswersPercent}%`)

    return (
        <>
            $<FlatList style={{flexDirection: "row"}} data={surveyContent} renderItem={({ item }) => (
                <SurveyCard question={item.question} answers={item.answers} id={item.id}
                answerSelection={selectAnswer}
                />
            )}
            />
            <Button title="Envoyer" onPress={() => getStats(selectedAnswers)} color="#ff4d4d" />
            <SurveyStatsView questionTotal={surveyContent.length} wrongAnswersCount={wrongAnswers.length} wrongAnswersPercent={wrongAnswersPercent === 0 ? 0 : wrongAnswersPercent} rightAnswersCount={rightAnswers.length} rightAnswersPercent={rightAnswersPercent === 0 ? 0 : rightAnswersPercent}/>
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
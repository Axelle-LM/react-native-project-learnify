import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Mistral } from '@mistralai/mistralai';

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

// Types spécial pour Mistral AI

type Message = {
    role: string;
    content: string;
};

type ChatChoice = {
    message: Message;
};

type ChatResponse = {
    choices: ChatChoice[];
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
    question: "Quel est la capitale de la France ?",
    answer: "Paris",
};

const question2: FlashcardProps = {
    id: "2",
    question: "Qui était Louis XIV ?",
    answer: "Un roi",
};

const question3: FlashcardProps = {
    id: "3",
    question: "C'est quoi l'ONU ?",
    answer: "Organisation des Nation Unies",
};

const SurveyViewApp = () => {
    const [flashcards, setFlashcards] = useState<FlashcardProps[]>([])
    const [surveyContent, setSurveyContent] = useState<SurveyCardProps[]>([])
    const [selectedAnswers, setSelectedAnswers] = useState<SurveyAnswer[]>([])

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

    // // nous vous invitons à décommenter ce bout de code après une utilisation de requête
// const apiKey = "kiB9uh5VjZadAWajt9AVcVjSlzEeatk6";

// const client = new Mistral({ apiKey: apiKey });


async function getWrongAnswer(question: string): Promise<string | null> {

    try {
        const response = await fetch('https://chatgpt-ai-assistant.p.rapidapi.com/', 
            {
                method: 'POST',
                headers: {
                    'x-rapidapi-key': '5279274116mshfb09f8d31d5c9e4p18d144jsn5da42cdeb7c7',
                    'x-rapidapi-host': 'chatgpt-ai-assistant.p.rapidapi.com',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    model: 'o1-mini-2024-09-12',
                    messages: [
                        {
                            role: 'user',
                            content: `Peux-tu me donner une mauvaise réponse très courte et assez difficile pour trouver la bonne réponse pour cette question sans phrase d'introduction : ${question}`
                        }
                    ]
                })
            }
        );
	    const result = await response.json();
        return result.choices[0].message.content

    } catch (error) {
        console.error("Erreur lors de l'appel à l'API :", error);
        return null;
    }
}

    const getFlashCards = () => {
        setFlashcards([question1, question2, question3]);
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
                },
                // { 
                //     value: 2, 
                //     title: generateRandomString(5),
                //     wrong: true, 
                //     right: false
                // },
                // {
                //     value: 3, 
                //     title: generateRandomString(5),
                //     wrong: true,
                //     right: false 
                // },
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

        });
        
    };

    const rightPercent = (rightAnswers.length * 100) / surveyContent.length
    const wrongPercent = (wrongAnswers.length * 100) / surveyContent.length

    console.log("Réponses sélectionnés", selectedAnswers)
    console.log(`Nombres de bonnes réponses: ${rightAnswers.length}`)
    console.log(`Tableau des bonnes réponses: ${rightAnswers}`)
    console.log(`Pourcentage des bonnes réponses: ${rightPercent}%`)
    console.log(`Nombres de mauvaises réponses: ${wrongAnswers.length}`)
    console.log(`Tableau des mauvaises réponses: ${wrongAnswers}`)
    console.log(`Pourcentage des mauvaises réponses: ${wrongPercent}%`)
    
    useEffect(() => {
        getFlashCards()
    }, [])

    return (
        <>
            $<FlatList style={{flexDirection: "row"}} data={surveyContent} renderItem={({ item }) => (
                <SurveyCard question={item.question} answers={item.answers} id={item.id}
                answerSelection={selectAnswer}
                />
            )}
            />
            <Button title="Envoyer" onPress={() => getStats(selectedAnswers)} color="#ff4d4d" />
            <SurveyStatsView questionTotal={surveyContent.length} wrongAnswersCount={wrongAnswers.length} wrongAnswersPercent={wrongPercent} rightAnswersCount={rightAnswers.length} rightAnswersPercent={rightPercent}/>
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
    }
});

export default SurveyViewApp;
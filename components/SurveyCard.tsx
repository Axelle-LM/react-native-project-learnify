import React from "react";
import { View, FlatList, Button, Text, StyleSheet } from "react-native";


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

export default SurveyCard
import React from "react";
import { Dimensions, View, Text, StyleSheet } from "react-native";

const screenWidth = Dimensions.get('window').width; // Largeur de l'écran
const cardWidth = screenWidth / 5; // Largeur calculée pour 5 cartes sur une ligne

type SurveyStats = {
    questionTotal: number,
    rightAnswersCount: number,
    wrongAnswersCount: number,
    rightAnswersPercent: number,
    wrongAnswersPercent: number
};

const SurveyStatsView = ({ questionTotal, rightAnswersCount, wrongAnswersCount, rightAnswersPercent, wrongAnswersPercent }: SurveyStats) => {
    return (
    <>
        <View style={styles.statscontainer}>
            {/* 5 cartes statiques */}
            <View style={styles.statsCard}>
                <Text style={styles.question}>Score du test</Text>
                <Text style={styles.rightAnswsersCount}>{rightAnswersCount}/{questionTotal}</Text>
            </View>
            <View style={styles.statsCard}>
                <Text style={styles.question}>Nombres de bonnes réponses</Text>
                <Text style={styles.rightAnswsersCount}>{rightAnswersCount}</Text>
            </View>
            <View style={styles.statsCard}>
                <Text style={styles.question}>Nombres de mauvaises réponses</Text>
                <Text style={styles.rightAnswsersCount}>{wrongAnswersCount}</Text>
            </View>
            <View style={styles.statsCard}>
                <Text style={styles.question}>Pourcentage de bonnes réponses</Text>
                <Text style={styles.rightAnswsersCount}>{rightAnswersPercent}%</Text>
            </View>
            <View style={styles.statsCard}>
                <Text style={styles.question}>Pourcentage de mauvaises réponses</Text>
                <Text style={styles.rightAnswsersCount}>{wrongAnswersPercent}%</Text>
            </View>
        </View>
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
    statscontainer: {
        flexDirection: 'row', // Aligne les cartes horizontalement
        justifyContent: 'center', // Centre les cartes
        alignItems: 'center', // Aligne verticalement
    },
    statsCard: {
        width: cardWidth, // Largeur calculée pour adapter 5 cartes à l'écran
        height: cardWidth, // Hauteur égale à la largeur pour une carte carrée
        backgroundColor: '#f5a623',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 2, // Espacement entre les cartes
    },
    cardText: {
        color: '#fff',
        fontSize: 12,
        textAlign: 'center',
    },
});

export default SurveyStatsView
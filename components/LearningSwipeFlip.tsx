// Inspiration de code depuis le site de la librairie react-native-reanimated et react-native-gesture-handler: Flip example & ReanimatedSwipeable example
import AnswerCard from '@/components/AnswerCard';
import FlipCard from '@/components/FlipCard';
import QuestionCard from '@/components/QuestionCard';
import { FlashcardProps, FlashcardProvider, useFlashcards } from '@/context/FlashcardContext';
import React, { useState } from 'react';
import { Pressable, SafeAreaView, View, StyleSheet, Text, Dimensions, Button } from 'react-native';
import { GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler'; // Ces composants permetteront de gérer les gestes tactiles sur le téléphone pour le swipe
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated'; // Ces composant permetteront de gérer l'affichage de la flashcard pendant les gestes tactiles ainsi que les actions pour le flip (si la card est retourné ou non par exemple)

const { width } = Dimensions.get('window');
const SWIPE_THRESHOLD = width * 0.25;

export default function LearningSWipeFlip() {
  const isFlipped = useSharedValue(false);

  const handlePress = () => {
    isFlipped.value = !isFlipped.value;
  };

  const [currentIndex, setCurrentIndex] = useState(0); // Index de la première flashcard
    const elements: FlashcardProps[] = [{
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
    }] // Exemples de data de flashcard en guise de test pour simulation avec tableau flashcards de useFlashcards()

    const translateX = useSharedValue(0); // Initialisation pour le scroll à l'horizontale du swipe vers la droite

    // Le Swipe Manager : Permettre l'accès à la précédente card et à la card suivante selon l'orientation du swipe
    const handleSwipe = (direction: "left" | "right") => {
        if (direction === "right" && currentIndex < elements.length - 1) {
            // Swipe vers la droite -> élément suivant
            setCurrentIndex((prevIndex) => prevIndex + 1);
        } else if (direction === "left" && currentIndex > 0) {
            // Swipe vers la gauche -> élément précédent
            setCurrentIndex((prevIndex) => prevIndex - 1);
        }
        translateX.value = 0; // Réinitialise la position après le swipe pour garder la card sélectionné sans avoir l'effect d'un slider continue
    };

    // Le Swipe Handler: Fluidité de l'action de scroll horizontal
    const handleSwipeEnd = () => {
        if (translateX.value < -SWIPE_THRESHOLD) {
            // Swipe vers la droite (élément suivant)
            translateX.value = withTiming(-width, {}, () => runOnJS(handleSwipe)("right"));
        } else if (translateX.value > SWIPE_THRESHOLD) {
            // Swipe vers la gauche (élément précédent)
            translateX.value = withTiming(width, {}, () => runOnJS(handleSwipe)("left"));
        } else {
            // Retour à la position initiale si le seuil n'est pas atteint
            translateX.value = withSpring(0);
        }
    };

    // Animation Manager : Mise en place de la translation selon la position
    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: translateX.value }],
    }));

    const { flashcards, inMindAlreadyCards, addInMindCard, seeAgainCards, addSeeAgainCard } = useFlashcards();

    console.log(flashcards)
    
        console.log("In Mind Cards", inMindAlreadyCards)
    
        console.log("See Again Cards", seeAgainCards)

  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.knowledgeBox}>
            <Text>Vos acquis:</Text>
            {
                inMindAlreadyCards.map((card) => {
                    return (
                        <View style={styles.knowledgeCard}>
                            <Text>{card.question}</Text>
                        </View>
                    )
                })
            }
        </View>
        <View style={styles.knowledgeBox}>
            <Text>Où s'amélioré:</Text>
            {
                seeAgainCards.map((card) => {
                    return (
                        <View style={styles.knowledgeCard}>
                            <Text>{card.question}</Text>
                        </View>
                    )
                })
            }
        </View>
        <GestureHandlerRootView style={styles.container}>
                    <PanGestureHandler
                        onGestureEvent={(event) => {
                            translateX.value = event.nativeEvent.translationX; // Met à jour la position pendant le swipe (equivalent d'un onChange)
                        }}
                        onEnded={handleSwipeEnd} // Gestion du swipe complet
                    >
                        <Animated.View style={animatedStyle}>
                        <FlipCard
              isFlipped={isFlipped}
              cardStyle={styles.flipCard}
              FlippedContent={<AnswerCard answer={elements[currentIndex].answer}/>}
              RegularContent={<QuestionCard question={elements[currentIndex].question}/>} direction={'y'} duration={500}      />
                        </Animated.View>
                    </PanGestureHandler>
                </GestureHandlerRootView>
      <View style={styles.buttonContainer}>
        <Pressable style={styles.toggleButton} onPress={handlePress}>
          <Text style={styles.toggleButtonText}>See the answer</Text>
        </Pressable>
        
      <Button title="Connu" onPress={() => addInMindCard(elements[currentIndex])}/>
    <Button title="A revoir" onPress={() => addSeeAgainCard(elements[currentIndex])}/>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 300,
    alignItems: 'center',
    justifyContent: 'center',
  }, 
  knowledgeBox: {
    backgroundColor: '#73dff1',
    flexDirection: 'row'
  },
  knowledgeCard: {
    backgroundColor: "pink",
    alignItems: 'center',
    justifyContent: 'center',
    borderBlockColor: "black",
    borderRadius: 7
  },
  buttonContainer: {
    marginTop: 16,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  toggleButton: {
    backgroundColor: '#b58df1',
    padding: 12,
    borderRadius: 48,
  },
  toggleButtonText: {
    color: '#fff',
    textAlign: 'center',
  },
  flipCard: {
    width: 170,
    height: 200,
    backfaceVisibility: 'hidden',
  },
});
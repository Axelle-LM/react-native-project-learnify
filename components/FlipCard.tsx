import { FlashcardProps, FlashcardProvider, useFlashcards } from '@/context/FlashcardContext';
import React, { useState } from 'react';
import { Pressable, SafeAreaView, View, StyleSheet, Text, Dimensions, Button } from 'react-native';
import { GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler';
import Animated, {
  interpolate,
  runOnJS,
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

type Flip = {
    isFlipped: SharedValue<boolean>,
    cardStyle: object,
    FlippedContent: React.JSX.Element
    RegularContent: React.JSX.Element
}

const FlipCard = ({
  isFlipped,
  cardStyle,
  direction = 'y',
  duration = 500,
  RegularContent,
  FlippedContent,
}: Flip & {direction: string, duration: number}) => {
  const isDirectionX = direction === 'x';

  const regularCardAnimatedStyle = useAnimatedStyle(() => {
    const spinValue = interpolate(Number(isFlipped.value), [0, 1], [0, 180]);
    const rotateValue = withTiming(`${spinValue}deg`, { duration });

    return {
      transform: [
        isDirectionX ? { rotateX: rotateValue } : { rotateY: rotateValue },
      ],
    };
  });

  const flippedCardAnimatedStyle = useAnimatedStyle(() => {
    const spinValue = interpolate(Number(isFlipped.value), [0, 1], [180, 360]);
    const rotateValue = withTiming(`${spinValue}deg`, { duration });

    return {
      transform: [
        isDirectionX ? { rotateX: rotateValue } : { rotateY: rotateValue },
      ],
    };
  });

  return (
    <View>
      <Animated.View
        style={[
          flipCardStyles.regularCard,
          cardStyle,
          regularCardAnimatedStyle,
        ]}>
        {RegularContent}
      </Animated.View>
      <Animated.View
        style={[
          flipCardStyles.flippedCard,
          cardStyle,
          flippedCardAnimatedStyle,
        ]}>
        {FlippedContent}
      </Animated.View>
    </View>
  );
};

const flipCardStyles = StyleSheet.create({
  regularCard: {
    position: 'absolute',
    zIndex: 1,
  },
  flippedCard: {
    zIndex: 2,
  },
});

export default FlipCard
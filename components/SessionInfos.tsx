import React from 'react';
import { useColorScheme } from '@mui/material';
import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useDerivedValue,
  withDelay,
  withTiming,
  SharedValue,
} from 'react-native-reanimated';

type Bottom = {
    isOpen: SharedValue<boolean>, 
    toggleSheet: (toggleValue: SharedValue<boolean>) => void, 
    children: any
}

function BottomSheet({ isOpen, toggleSheet, duration = 500, children }: Bottom & {duration: number}) {
  const { colorScheme } = useColorScheme();
  const height = useSharedValue(0);
  const progress = useDerivedValue(() =>
    withTiming(isOpen.value ? 0 : 1, { duration })
  );

  const sheetStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: progress.value * 2 * height.value }],
  }));

  const backgroundColorSheetStyle = {
    backgroundColor: colorScheme === 'light' ? '#f8f9ff' : '#272B3C',
  };

  const backdropStyle = useAnimatedStyle(() => ({
    opacity: 1 - progress.value,
    zIndex: isOpen.value
      ? 1
      : withDelay(duration, withTiming(-1, { duration: 0 })),
  }));

  return (
    <>
      <Animated.View style={[sheetStyles.backdrop, backdropStyle]}>
        <TouchableOpacity style={styles.flex} onPress={toggleSheet} />
      </Animated.View>
      <Animated.View
        onLayout={(e) => {
          height.value = e.nativeEvent.layout.height;
        }}
        style={[sheetStyles.sheet, sheetStyle, backgroundColorSheetStyle]}>
        {children}
      </Animated.View>
    </>
  );
}

const sheetStyles = StyleSheet.create({
  sheet: {
    padding: 16,
    paddingRight: 2,
    paddingLeft: 2,
    height: 150,
    width: '100%',
    position: 'absolute',
    bottom: 0,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    zIndex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
});

export default function SessionsInfos(props: any) {
  const { colorScheme } = useColorScheme();

  const contentStyle = {
    color: colorScheme === 'light' ? '#001a72' : '#f8f9ff',
    textDecorationColor: colorScheme === 'light' ? '#001a72' : '#f8f9ff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  return (
    <SafeAreaView style={styles.container}>
      <BottomSheet isOpen={props.isOpen} toggleSheet={props.toggleSheet} duration={500}>
        <Animated.Text style={contentStyle}>
            <Text>Vous avez obtenu une note de {props.rightPercent}% sur un total de {props.questionTotal} questions lors de la dernière session effectué le {props.lastDate}. </Text>
            <Text>{props.rightPercent < 50 ? "Ce n'est pas encore trop tard, courage vous aller y arriver !" : "C'est très encourageant, continuez sur votre lancer !"}</Text>
        </Animated.Text>
      </BottomSheet>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  container: {
    flex: 1,
    height: 250,
  },
  BottomSheet: {
    height: 900
  },
  buttonContainer: {
    marginTop: 16,
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
  },
  toggleButton: {
    backgroundColor: '#b58df1',
    padding: 12,
    borderRadius: 48,
  },
  toggleButtonText: {
    color: 'white',
    padding: 0.5,
  },
  safeArea: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  bottomSheetButton: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingBottom: 2,
  },
  bottomSheetButtonText: {
    fontWeight: 600,
    textDecorationLine: 'underline',
  },
  answsersCountCard: {
    backgroundColor: '#f8f8f8',
    padding: 15,
    marginVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
},
rightAnswsersCount: {
    color: "green"
},
wrongAnswsersCount: {
    color: "red"
},
question: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
},
card: {
    backgroundColor: '#f8f8f8',
    padding: 15,
    marginVertical: 8,
    borderRadius: 8,
    overflow: "hidden",
    maxWidth: 100
},
statsContainer: {
    marginLeft: 5,
    marginRight: 5,
    gap: 2
}
});
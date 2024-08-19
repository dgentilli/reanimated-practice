import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
  State,
} from 'react-native-gesture-handler';

const SIZE = 100.0;
const RADIUS = SIZE * 2;
const DIAMETER = RADIUS * 2; // use size as the radius of the cirlce

export default function App() {
  const currentX = useSharedValue(0);
  const currentY = useSharedValue(0);
  const startX = useSharedValue(0);
  const startY = useSharedValue(0);

  const panGesture = Gesture.Pan()
    .onBegin((event) => {
      console.log('Gesture onBegin !!!!!!');
    })
    .onStart((event) => {
      startX.value = event.translationX;
      startY.value = event.translationY;
    })
    .onUpdate((event) => {
      console.log('event.translationX', event.translationX);
      currentX.value = event.translationX;
      currentY.value = event.translationY;
    })
    .onEnd((event, state) => {
      console.log('onEnd - event');
      /** The math stuff here comes from the tutorial. It works pretty well */
      const distance = Math.sqrt(currentX.value ** 2 + currentY.value ** 2);

      if (distance < RADIUS + SIZE / 2) {
        currentX.value = withSpring(startX.value);
        currentY.value = withSpring(startY.value);
      } else {
        currentX.value = event.translationX;
        currentY.value = event.translationY;
      }

      if (state === State.END) {
        console.log('Gesture ended normally');
      } else if (state === State.CANCELLED) {
        console.log('Gesture cancelled');
      } else if (state === State.FAILED) {
        console.log('Gesture failed');
      }
    });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: currentX.value },
        { translateY: currentY.value },
      ],
    };
  });

  return (
    <GestureHandlerRootView>
      <View style={styles.container}>
        <View style={styles.circle}>
          <GestureDetector gesture={panGesture}>
            <Animated.View style={[styles.square, animatedStyle]} />
          </GestureDetector>
        </View>

        <StatusBar style='auto' />
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  square: {
    height: SIZE,
    width: SIZE,
    backgroundColor: 'rgba(0, 0, 256, 0.5)',
    borderRadius: 20,
  },
  circle: {
    height: DIAMETER,
    width: DIAMETER,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: DIAMETER,
    borderWidth: 3,
    borderColor: 'rgba(0, 0, 256, 0.5)',
  },
});

import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  withRepeat,
} from 'react-native-reanimated';

const SIZE = 100.0;

const handleRotate = (progress) => {
  'worklet';
  return `${progress.value * 2 * Math.PI}rad`;
};

export default function App() {
  const progress = useSharedValue(1);
  const scale = useSharedValue(2);
  const reanimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: progress.value,
      transform: [{ scale: scale.value }, { rotate: handleRotate(progress) }],
      borderRadius: (progress.value * SIZE) / 2,
    };
  }, []);

  useEffect(() => {
    /** Keep the lines below as examples for using different methods from Reanimated */
    // progress.value = withTiming(0.5, { duration: 2000 });
    // progress.value = withSpring(0.5);
    // scale.value = withSpring(1);

    /**
     * The second argument passed to withRepeat is the number of times to repeat the animation
     * If -1 is passed, the animation will repeat inifinitely
     */
    progress.value = withRepeat(withSpring(0.5), 5, true);
    scale.value = withRepeat(withSpring(1), 5, true);
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          { height: SIZE, width: SIZE, backgroundColor: 'blue' },
          reanimatedStyle,
        ]}
      />
      <StatusBar style='auto' />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

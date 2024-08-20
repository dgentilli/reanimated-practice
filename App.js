import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Dimensions, StyleSheet, Switch, Text, View } from 'react-native';
import Animated, {
  Extrapolation,
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const colors = {
  dark: {
    background: '#1e1e1e',
    circle: '#333333',
    text: 'white',
  },
  light: {
    background: '#f8f8f8',
    circle: '#ffffff',
    text: 'black',
  },
};

const SWITCH_TRACK_COLOR = {
  true: 'rgba(256, 0, 256, 0.2)',
  false: 'rgba(0, 0, 0, 0.1)',
};

const SIZE = Dimensions.get('window').width * 0.7;

export default function App() {
  const [theme, setTheme] = useState('light');
  // const progress = useSharedValue(0);
  const progress = useDerivedValue(() => {
    return theme === 'dark'
      ? withTiming(1, { duration: 1000 })
      : withTiming(0, { duration: 1000 });
  }, [theme]);

  const rStyle = useAnimatedStyle(() => {
    const bgColor = interpolateColor(
      progress.value,
      [0, 1],
      [colors.light.background, colors.dark.background]
    );
    return { backgroundColor: bgColor };
  });

  const rCircleStyle = useAnimatedStyle(() => {
    const bgColor = interpolateColor(
      progress.value,
      [0, 1],
      [colors.light.circle, colors.dark.circle]
    );
    return { backgroundColor: bgColor };
  });

  const rTextStyle = useAnimatedStyle(() => {
    const color = interpolateColor(
      progress.value,
      [0, 1],
      [colors.light.text, colors.dark.text]
    );
    return { color };
  });

  return (
    <Animated.View style={[styles.container, rStyle]}>
      <Animated.Text style={[styles.text, rTextStyle]}>{theme}</Animated.Text>
      <Animated.View style={[styles.circle, rCircleStyle]}>
        <Switch
          value={theme === 'dark'}
          onValueChange={(toggled) => {
            setTheme(toggled ? 'dark' : 'light');
          }}
          trackColor={SWITCH_TRACK_COLOR}
          thumbColor={'violet'}
        />
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle: {
    width: SIZE,
    height: SIZE,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: SIZE / 2,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  text: {
    fontSize: 70,
    textTransform: 'uppercase',
    letterSpacing: 14,
    marginBottom: 30,
    fontWeight: '200',
  },
});

import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
import Page from './components/Page';

const TITLES = ["What's", 'Up', 'Mobile', 'Devs?'];

export default function App() {
  const translateX = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler((event) => {
    translateX.value = event.contentOffset.x;
  });
  return (
    <Animated.ScrollView
      horizontal
      pagingEnabled
      style={styles.container}
      scrollEventThrottle={16}
      onScroll={scrollHandler}
    >
      {TITLES.map((title, index) => {
        return (
          <Page
            key={title}
            title={title}
            index={index}
            translateX={translateX}
          />
        );
      })}
    </Animated.ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

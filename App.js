import React from 'react';
import {
  Dimensions,
  Image,
  ImageBackground,
  StyleSheet,
  View,
} from 'react-native';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

/** attribution for heart icon <a href="https://www.flaticon.com/free-icons/heart" title="heart icons">Heart icons created by Freepik - Flaticon</a> */
/** attribution for bg image https://unsplash.com/photos/red-and-white-love-wall-decor-60GsdOMRFGc */

const { width: SIZE } = Dimensions.get('window');

const AnimatedImage = Animated.createAnimatedComponent(Image);

export default function App() {
  const scale = useSharedValue(0);
  const textOpacity = useSharedValue(0);

  const heartStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: Math.max(scale.value, 0) }],
    };
  });

  const textStyle = useAnimatedStyle(() => {
    return {
      opacity: textOpacity.value,
    };
  });

  const singleTap = Gesture.Tap()
    .maxDuration(250)
    .onEnd(() => {
      textOpacity.value = withTiming(1, undefined, (isFinished) => {
        if (isFinished) {
          textOpacity.value = withDelay(500, withTiming(0));
        }
      });
    });

  const doubleTap = Gesture.Tap()
    .maxDuration(250)
    .numberOfTaps(2)
    .onEnd(() => {
      console.log('double tap END');
      scale.value = withSpring(1, undefined, (isFinished) => {
        if (isFinished) {
          scale.value = withDelay(500, withSpring(0));
        }
      });
    });

  const gesture = Gesture.Exclusive(doubleTap, singleTap);
  /** Docs specific to Gesture.Exclusive
   * https://docs.swmansion.com/react-native-gesture-handler/docs/fundamentals/gesture-composition/#exclusive
   */

  /** See more about gesture composition here:
   * https://docs.swmansion.com/react-native-gesture-handler/docs/fundamentals/gesture-composition/
   */

  return (
    <GestureHandlerRootView>
      <View style={styles.container}>
        <GestureDetector gesture={gesture}>
          <Animated.View>
            <ImageBackground
              source={require('./assets/image-bg.jpg')}
              style={styles.image}
            >
              <AnimatedImage
                source={require('./assets/heart.png')}
                style={[styles.image, styles.heart, heartStyle]}
                resizeMode={'center'}
              />
            </ImageBackground>
            <Animated.Text style={[styles.text, textStyle]}>
              Tap twice to like
            </Animated.Text>
          </Animated.View>
        </GestureDetector>
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
  image: {
    height: SIZE,
    width: SIZE,
  },
  heart: {
    opacity: 0.5,
    backgroundColor: 'pink',
  },
  text: {
    fontSize: 30,
    textAlign: 'center',
    marginTop: 20,
  },
});

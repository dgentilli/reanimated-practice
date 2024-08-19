import React from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';

const { height, width } = Dimensions.get('window');
const SIZE = width * 0.7;

const Page = ({ title = '', index = 0, translateX }) => {
  const rStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      translateX.value,
      [(index - 1) * width, index * width, (index + 1) * width],
      [0, 1, 0],
      // Clamping clamps the output value to the edges of the output range
      // even if the input value falls outside the input range
      Extrapolation.CLAMP
    );

    const borderRadius = interpolate(
      translateX.value,
      [(index - 1) * width, index * width, (index + 1) * width],
      [0, SIZE / 2, 0],
      Extrapolation.CLAMP
    );
    return {
      transform: [{ scale }],
      borderRadius,
    };
  });

  const rTextStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      translateX.value,
      [(index - 1) * width, index * width, (index + 1) * width],
      [height / 2, 0, -height / 2],
      Extrapolation.CLAMP
    );

    const opacity = interpolate(
      translateX.value,
      [(index - 1) * (width / 2), index * width, (index + 1) * (width / 2)],
      [0, 1, 0],
      Extrapolation.CLAMP
    );

    return {
      transform: [{ translateY }],
      opacity,
    };
  });

  return (
    <Animated.View
      style={[
        styles.pageContainer,
        { backgroundColor: `rgba(0, 0, 255, 0.${index + 2})` },
      ]}
    >
      <Animated.View style={[styles.square, rStyle]} />
      <Animated.View style={[styles.textContainer, rTextStyle]}>
        <Text style={styles.text}>{title}</Text>
      </Animated.View>
    </Animated.View>
  );
};

export default Page;

const styles = StyleSheet.create({
  pageContainer: {
    height: '100%',
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  square: {
    height: SIZE,
    width: SIZE,
    backgroundColor: 'rgba(0,0,256,0.4)',
  },
  textContainer: {
    position: 'absolute',
  },
  text: {
    fontSize: 70,
    color: '#fff',
    textTransform: 'uppercase',
  },
});

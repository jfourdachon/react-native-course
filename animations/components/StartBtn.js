import { useEffect, useRef } from "react";
import {
  Animated,
  Dimensions,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

const BTN_SIZE = Dimensions.get("screen").width / 2;
const CIRCLE_SIZE = BTN_SIZE + 8;

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function StartBtn() {
  const animatedScale = useRef(new Animated.Value(1)).current;
  const animatedOpacity = useRef(new Animated.Value(1)).current;
  const animatedColor = useRef(new Animated.Value(0)).current;
  const animatedTranslate = useRef(new Animated.Value(0)).current;

  const onPress = () => {
    animatedScale.resetAnimation();
    animatedOpacity.resetAnimation();
    animatedColor.resetAnimation();
    Animated.timing(animatedTranslate, {
      toValue: Dimensions.get("screen").width,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    Animated.loop(
      Animated.parallel([
        Animated.timing(animatedScale, {
          toValue: 5,
          duration: 3000,
          delay: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(animatedOpacity, {
          toValue: 0,
          duration: 3000,
          delay: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
    Animated.loop(
      Animated.timing(animatedColor, {
        toValue: 7,
        duration: 14000,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  const interpolatedColor = animatedColor.interpolate({
    inputRange: [0, 1, 2, 3, 4, 5, 6, 7],
    outputRange: [
      "#d44444",
      "#d4c844",
      "#5cd444",
      "#44cfd4",
      "#4b44d4",
      "#a944d4",
      "#d4449d",
      "#d44444",
    ],
  });

  return (
    <Animated.View
      style={[
        styles.container,
        { transform: [{ translateX: animatedTranslate }] },
      ]}
    >
      <AnimatedPressable
        style={[styles.btn, { backgroundColor: interpolatedColor }]}
        onPress={onPress}
      >
        <Text style={styles.text}>Jouer</Text>
      </AnimatedPressable>
      <Animated.View
        style={[
          styles.circle,
          {
            transform: [
              { translateX: -CIRCLE_SIZE / 2 },
              { translateY: -CIRCLE_SIZE / 2 },
              { scale: animatedScale },
            ],
            opacity: animatedOpacity,
            borderColor: interpolatedColor,
          },
        ]}
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
  },
  btn: {
    width: BTN_SIZE,
    height: BTN_SIZE,
    borderRadius: 99,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
  },
  text: {
    color: "white",
    fontSize: 24,
    fontWeight: "700",
  },
  circle: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: 99,
    borderWidth: 2,
    position: "absolute",
    top: "50%",
    left: "50%",
  },
});

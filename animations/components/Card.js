import {
  StyleSheet,
  Animated,
  Pressable,
  Image,
  Dimensions,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";

const SCREEN_WIDTH = Dimensions.get("screen").width;
const SCREEN_HEIGHT = Dimensions.get("screen").height;
const MARGIN_VERTICAL = 120;
const MARGIN_HORIZONTAL = 16;
const SPACE_BETWEEN_CARDS = 12;
const CARD_WIDTH =
  (SCREEN_WIDTH - MARGIN_HORIZONTAL * 2 - SPACE_BETWEEN_CARDS * 2) / 3;
const CARD_HEIGHT =
  (SCREEN_HEIGHT - MARGIN_VERTICAL * 2 - SPACE_BETWEEN_CARDS * 3) / 4;

export default function Card({ index, shouldDistribute }) {
  //   const rotateAnim = useRef(new Animated.Value(0)).current;
  //   const opacityAnim = useRef(new Animated.Value(1)).current;
  const aniamtedLeft = useRef(
    new Animated.Value(SCREEN_WIDTH / 2 - CARD_WIDTH / 2)
  ).current;
  const animatedTop = useRef(
    new Animated.Value(SCREEN_HEIGHT / 2 - CARD_HEIGHT / 2)
  ).current;

  //   const onPress = () => {
  //     onPressCard(card);
  //   };

  const distribute = () => {
    Animated.parallel([
      Animated.timing(aniamtedLeft, {
        toValue:
          (index + 1) % 3 === 0
            ? MARGIN_HORIZONTAL + CARD_WIDTH * 2 + SPACE_BETWEEN_CARDS * 2
            : (index + 1) % 2 === 0
            ? MARGIN_HORIZONTAL + CARD_WIDTH + SPACE_BETWEEN_CARDS
            : MARGIN_HORIZONTAL,
        duration: 1000,
        delay: index * 100,
        useNativeDriver: true,
      }),
      Animated.timing(animatedTop, {
        toValue:
          index < 3
            ? MARGIN_VERTICAL
            : index < 6
            ? MARGIN_VERTICAL + CARD_HEIGHT + SPACE_BETWEEN_CARDS
            : index < 9
            ? MARGIN_VERTICAL + CARD_HEIGHT * 2 + SPACE_BETWEEN_CARDS * 2
            : MARGIN_VERTICAL + CARD_HEIGHT * 3 + SPACE_BETWEEN_CARDS * 3,
        duration: 1000,
        delay: index * 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  useEffect(() => {
    if (shouldDistribute) distribute();
  }, [shouldDistribute]);

  //   const initPosition = () => {
  //     Animated.sequence(
  //       [
  //         Animated.timing(top, {
  //           toValue: SCREEN_HEIGHT / 2 - CARD_HEIGHT / 2,
  //           duration: 0,
  //           useNativeDriver: true,
  //         }),
  //         Animated.timing(left, {
  //           toValue: SCREEN_WIDTH / 2 - CARD_WIDTH / 2,
  //           duration: 0,
  //           useNativeDriver: true,
  //         }),
  //         // Animated.timing(rotateAnim, {
  //         //   toValue: 0,
  //         //   duration: 0,
  //         //   useNativeDriver: true,
  //         // }),
  //         // Animated.timing(opacityAnim, {
  //         //   toValue: 1,
  //         //   duration: 0,
  //         //   delay: 0,
  //         //   useNativeDriver: true,
  //         // }),
  //       ],
  //       { stopTogether: false }
  //     ).start(() => {
  //       distribute();
  //     });
  //   };

  //   useEffect(() => {
  //     if (isCleared) {
  //       Animated.timing(opacityAnim, {
  //         toValue: 0,
  //         duration: 500,
  //         useNativeDriver: true,
  //       }).start();
  //     } else if (isFlipped) {
  //       Animated.timing(rotateAnim, {
  //         toValue: 1,
  //         duration: 500,
  //         useNativeDriver: true,
  //       }).start();
  //     } else {
  //       Animated.timing(rotateAnim, {
  //         toValue: 0,
  //         duration: 500,
  //         useNativeDriver: true,
  //       }).start();
  //     }
  //   }, [isFlipped, isCleared]);

  //   useEffect(() => {
  //     if (shoudDistribute) {
  //       initPosition();
  //     }
  //   }, [shoudDistribute]);

  //   const frontSpin = rotateAnim.interpolate({
  //     inputRange: [0, 1],
  //     outputRange: ["0deg", "180deg"],
  //   });

  //   const backSpin = rotateAnim.interpolate({
  //     inputRange: [0, 1],
  //     outputRange: ["180deg", "0deg"],
  //   });

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [
            { translateX: aniamtedLeft },
            { translateY: animatedTop },
          ],
          //   opacity: opacityAnim,
        },
      ]}
    >
      <Pressable
        // onPress={onPress}
        style={styles.cardContainer}
      >
        <Image
          style={[
            styles.card,
            styles.frontCard,
            //   { transform: [{ rotateY: frontSpin }], perspective: 1000 },
          ]}
          resizeMode="contain"
          source={require("../assets/pokeball.png")}
        />
        {/* <Animated.View
            style={[
              styles.card,
              styles.backCard,
              { transform: [{ rotateY: backSpin }], perspective: 1000 },
            ]}
          >
            <Image style={styles.image} source={card.source} />
          </Animated.View> */}
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    position: "absolute",
  },
  cardContainer: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
  },
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    backfaceVisibility: "hidden",
    borderRadius: 8,
  },
  frontCard: {
    backgroundColor: "powderblue",
  },
  //   backCard: {
  //     backgroundColor: "coral",
  //   },
  //   image: {
  //     width: "100%",
  //     height: "100%",
  //     resizeMode: "contain",
  //   },
});

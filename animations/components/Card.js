import { useEffect, useRef } from "react";
import {
  Animated,
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
} from "react-native";

const SCREEN_WIDTH = Dimensions.get("screen").width;
const SCREEN_HEIGHT = Dimensions.get("screen").height;
const MARGIN_VERTICAL = 120;
const MARGIN_HORIZONTAL = 16;
const SPACE_BETWEEN_CARDS = 12;
const CARD_WIDTH =
  (SCREEN_WIDTH - MARGIN_HORIZONTAL * 2 - SPACE_BETWEEN_CARDS * 2) / 3;
const CARD_HEIGHT =
  (SCREEN_HEIGHT - MARGIN_VERTICAL * 2 - SPACE_BETWEEN_CARDS * 3) / 4;

export default function Card({
  index,
  shouldDistribute,
  card,
  onPressCard,
  isFlipped,
  isCleared,
}) {
  const animatedLeft = useRef(
    new Animated.Value(SCREEN_WIDTH / 2 - CARD_WIDTH / 2)
  ).current;
  const animatedTop = useRef(
    new Animated.Value(SCREEN_HEIGHT / 2 - CARD_HEIGHT / 2)
  ).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const animatedOpacity = useRef(new Animated.Value(1)).current;

  const distribute = () => {
    Animated.parallel([
      Animated.timing(animatedLeft, {
        toValue:
          (index + 1) % 3 === 0 // troisième colonne
            ? MARGIN_HORIZONTAL + CARD_WIDTH * 2 + SPACE_BETWEEN_CARDS * 2
            : (index + 1) % 2 === 0 // 2ème colonne
            ? MARGIN_HORIZONTAL + CARD_WIDTH + SPACE_BETWEEN_CARDS
            : MARGIN_HORIZONTAL, // 1ère colonne
        duration: 1000,
        delay: index * 100, // Augemte le délai à chaque carte
        useNativeDriver: true,
      }),
      Animated.timing(animatedTop, {
        toValue:
          index < 3 // 1ère ligne
            ? MARGIN_VERTICAL
            : index < 6 // 2ème ligne
            ? MARGIN_VERTICAL + CARD_HEIGHT + SPACE_BETWEEN_CARDS
            : index < 9 // 3ème ligne
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

  useEffect(() => {
    if (isCleared) {
      Animated.timing(animatedOpacity, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start();
    } else if (isFlipped) {
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(rotateAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }
  }, [isFlipped, isCleared]);

  const flipCard = () => {
    if (!isCleared && !isFlipped) onPressCard(card);
  };

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "180deg"],
  });

  const reversedSpin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["180deg", "0deg"],
  });

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [
            { translateX: animatedLeft },
            { translateY: animatedTop },
          ],
          opacity: animatedOpacity,
        },
      ]}
    >
      <Pressable style={styles.cardContainer} onPress={flipCard}>
        <Animated.View
          style={[
            styles.card,
            styles.backCard,
            { transform: [{ rotateY: spin }, { perspective: 1000 }] },
          ]}
        >
          <Image
            style={styles.image}
            source={require("../assets/pokeball.png")}
          />
        </Animated.View>
        <Animated.View
          style={[
            styles.card,
            styles.frontCard,
            { transform: [{ rotateY: reversedSpin }, { perspective: 1000 }] },
          ]}
        >
          <Image style={styles.image} source={card.source} />
        </Animated.View>
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
    borderRadius: 8,
    position: "absolute",
    backfaceVisibility: "hidden",
  },
  frontCard: {
    backgroundColor: "coral",
  },
  backCard: {
    backgroundColor: "powderblue",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
});

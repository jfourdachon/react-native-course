import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import CartIcon from "../../../assets/images/navigation/cart.svg";
import { ICON_SIZE, SMALL_ICON_SIZE } from "../../../constants/sizes";
import { colors } from "../../../constants/colors";
import TextBoldM from "../../../ui-components/texts/TextBoldM";
import { StyleSheet } from "react-native";
import { radius } from "../../../constants/radius";
import { spaces } from "../../../constants/spaces";

const MAIN_WIDTH = 80;

export default function AnimatedHeader({
  shouldAnimate,
  setShouldAnimate,
  cartCount,
}) {
  const navigation = useNavigation();
  const [count, setCount] = useState(cartCount);
  const aniamtedTranslate = useSharedValue(spaces.M + MAIN_WIDTH);
  const animatedScale = useSharedValue(1);

  const animatedContainerStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: aniamtedTranslate.value }],
  }));

  const animatedBadgeStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: -SMALL_ICON_SIZE / 2 },
      { translateX: -SMALL_ICON_SIZE / 2 },
      { scale: animatedScale.value },
    ],
  }));

  useEffect(() => {
    if (shouldAnimate) {
      aniamtedTranslate.value = withTiming(spaces.M, { duration: 2000 }, () => {
        runOnJS(setCount)(cartCount);
        animatedScale.value = withRepeat(withSpring(1.5), 2, true, () => {
          aniamtedTranslate.value = withTiming(
            spaces.M + MAIN_WIDTH,
            {
              duration: 2000,
            },
            () => {
              runOnJS(setShouldAnimate)(false);
            }
          );
        });
      });
    }
  }, [shouldAnimate]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Animated.View style={[styles.container, animatedContainerStyle]}>
          <CartIcon width={ICON_SIZE} height={ICON_SIZE} color={colors.WHITE} />
          <Animated.View style={[styles.badge, animatedBadgeStyle]}>
            <TextBoldM blue>{count}</TextBoldM>
          </Animated.View>
        </Animated.View>
      ),
    });
  }, [count]);

  return null;
}

const styles = StyleSheet.create({
  container: {
    width: MAIN_WIDTH,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderTopLeftRadius: radius.REGULAR,
    borderBottomLeftRadius: radius.REGULAR,
    backgroundColor: colors.BLUE,
  },
  badge: {
    width: SMALL_ICON_SIZE,
    height: SMALL_ICON_SIZE,
    position: "absolute",
    top: "50%",

    alignItems: "center",
    justifyContent: "center",
    borderRadius: radius.FULL,
    backgroundColor: colors.WHITE,
  },
});

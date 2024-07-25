import { useRef, useEffect } from "react";
import { Button, StyleSheet, View } from "react-native";
import LottieView from "lottie-react-native";
import { colors } from "../../constants/colors";

export default function SplashScreen({ appReadyHandler }) {
  useEffect(() => {
    // You can control the ref programmatically, rather than using autoPlay
    // animation.current?.play();
  }, []);

  return (
    <View>
      <LottieView
        autoPlay
        onAnimationFinish={appReadyHandler}
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: colors.LIGHT,
        }}
        loop={false}
        speed={0.5}
        // Find more Lottie files at https://lottiefiles.com/featured
        source={require("../../assets/splash/animation.json")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  animationContainer: {
    flex: 1,
  },
});

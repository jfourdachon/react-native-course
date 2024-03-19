import { useFonts } from "expo-font";
import HomeScreen from "./screens/home";
import { SCREEN_WIDTH } from "./constants/sizes";

export default function App() {
  console.log(SCREEN_WIDTH);
  const [fontsLoaded] = useFonts({
    Light: require("./assets/fonts/Montserrat-Light.ttf"),
    Regular: require("./assets/fonts/Montserrat-Regular.ttf"),
    Medium: require("./assets/fonts/Montserrat-Medium.ttf"),
    SemiBold: require("./assets/fonts/Montserrat-SemiBold.ttf"),
  });
  return fontsLoaded ? <HomeScreen /> : null;
}

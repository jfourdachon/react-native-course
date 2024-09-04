if (__DEV__) {
  require("./ReactotronConfig");
}

import "react-native-reanimated";
import "react-native-gesture-handler";
import { useFonts } from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import MainStackNavigator from "./navigators/MainStackNavigator";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { getApps, initializeApp } from "firebase/app";
import { firebaseConfig } from "./firebaseConfig";
import { linkingConfig } from "./utils/linking";

export default function App() {
  const apps = getApps();
  if (apps.length === 0) {
    initializeApp(firebaseConfig);
  }
  const [fontsLoaded] = useFonts({
    Light: require("./assets/fonts/Montserrat-Light.ttf"),
    Regular: require("./assets/fonts/Montserrat-Regular.ttf"),
    Medium: require("./assets/fonts/Montserrat-Medium.ttf"),
    SemiBold: require("./assets/fonts/Montserrat-SemiBold.ttf"),
  });
  return fontsLoaded ? (
    <Provider store={store}>
      <SafeAreaProvider>
        <NavigationContainer linking={linkingConfig}>
          <MainStackNavigator />
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  ) : null;
}

import { StyleSheet, StatusBar, SafeAreaView } from "react-native";
import { useFonts } from "expo-font";
import List from "./components/List";

export default function App() {
  const [fontLoaded] = useFonts({
    "Inter-Regular": require("./assets/fonts/Inter-Regular.ttf"),
    "Inter-Bold": require("./assets/fonts/Inter-Bold.ttf"),
  });

  return fontLoaded ? (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <List />
    </SafeAreaView>
  ) : null;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

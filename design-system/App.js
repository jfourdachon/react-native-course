import { StyleSheet, StatusBar, SafeAreaView, FlatList } from "react-native";
import { useFonts } from "expo-font";
import { data } from "./data/index";
import ItemCard from "./components/ItemCard";
import { padding } from "./constants/padding";
import ListItemSeparator from "./components/ListItemSeparator";

export default function App() {
  const [fontLoaded] = useFonts({
    "Inter-Regular": require("./assets/fonts/Inter-Regular.ttf"),
    "Inter-Bold": require("./assets/fonts/Inter-Bold.ttf"),
  });

  return fontLoaded ? (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <FlatList
        style={styles.listContainer}
        ItemSeparatorComponent={ListItemSeparator}
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ItemCard
            color={item.color}
            title={item.title}
            description={item.description}
            Logo={item.logo}
          />
        )}
      />
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
  listContainer: {
    width: "100%",
    paddingHorizontal: padding.HORIZONTAL_SCREEN,
    marginTop: 8,
  },
});

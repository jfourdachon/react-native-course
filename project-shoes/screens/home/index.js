import { SafeAreaView, StyleSheet, ScrollView, View } from "react-native";
import { colors } from "../../constants/colors";
import SearchSection from "./searchSection";
import ListSection from "./listSection";
import NewsSection from "./newsSection";
import { useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function HomeScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const [inputValue, setInputValue] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("nike");
  return (
    <View style={[styles.container]}>
      <ScrollView
        contentContainerStyle={styles.scrollViewContainer}
        bounces={false}
      >
        <SearchSection
          inputValue={inputValue}
          setInputValue={setInputValue}
          selectedBrand={selectedBrand}
          setSelectedBrand={setSelectedBrand}
        />
        <ListSection
          selectedBrand={selectedBrand}
          inputValue={inputValue}
          navigation={navigation}
        />
        <NewsSection selectedBrand={selectedBrand} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.LIGHT,
    justifyContent: "space-between",
  },
  scrollViewContainer: {
    flexGrow: 1,
  },
});

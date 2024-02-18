import { SafeAreaView, StyleSheet, View, StatusBar, Text } from "react-native";
import { colors } from "../../constants/colors";
import { useState } from "react";
import ListSection from "./sections/listSection";
import SearchSection from "./sections/searchSection";
import NewsSection from "./sections/newsSection";

export default function HomeScreen() {
  const [selectedBrand, setSelectedBrand] = useState("nike");
  const [searchInputValue, setSearchInputValue] = useState("");
  const selectBrand = (brand) => {
    setSelectedBrand(brand);
  };
  const inputSearchHandler = (value) => {
    setSearchInputValue(value);
  };
  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{ width: "100%", height: 60, backgroundColor: "#000000" }}
      ></View>
      <SearchSection
        selectedBrand={selectedBrand}
        selectBrand={selectBrand}
        inputSearchHandler={inputSearchHandler}
      />
      <ListSection
        selectedBrand={selectedBrand}
        searchInputValue={searchInputValue}
      />
      <NewsSection selectedBrand={selectedBrand} />
      <View
        style={{ width: "100%", height: 106, backgroundColor: "#000000" }}
      ></View>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.LIGHT,
  },
});

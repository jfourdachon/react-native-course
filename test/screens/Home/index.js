import { SafeAreaView, StyleSheet, View, StatusBar, Text } from "react-native";
import { useState } from "react";
import SearchSection from "./components/searchSection/SearchSection";
import { colors } from "../../constants/colors";
import { textSize } from "../../constants/textSize";
import ShoesList from "./components/list/ShoesList";
import Banner from "./components/shared/Banner";
import { spaces } from "../../constants/space";

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{ width: "100%", height: 60, backgroundColor: "#000000" }}
      ></View>
      <SearchSection />
      <View
        style={{
          flex: 0.44,
          width: "100%",
          paddingVertical: spaces.S,
        }}
      >
        <Banner text="Shoes Populaires" />
        <ShoesList />
      </View>
      <View style={{ flex: 0.31, width: "100%" }}></View>
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

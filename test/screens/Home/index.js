import { SafeAreaView, StyleSheet, View, StatusBar, Text } from "react-native";
import { useState } from "react";
import SearchSection from "./components/SearchSection";
import { colors } from "../../constants/colors";
import { textSize } from "../../constants/textSize";

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ width: "100%", height: 60, backgroundColor: "#000000" }}>
        <Text
          style={{
            color: colors.WHITE,
            fontSize: textSize.XL,
            fontFamily: "SemiBold",
          }}
        >
          Hello
        </Text>
      </View>
      <SearchSection />
      <View style={{ flex: 0.46, width: "100%" }}></View>
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
    backgroundColor: "#edf2f7",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

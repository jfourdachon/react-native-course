import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { textSize } from "../../../../constants/textSize";
import { colors } from "../../../../constants/colors";
import { spaces } from "../../../../constants/space";

const Banner = ({ text }) => {
  return (
    <View style={styles.bannerContainer}>
      <Text style={styles.bannerTitle}>{text}</Text>
      <Text style={styles.linkText}>Voir tout</Text>
    </View>
  );
};

export default Banner;

const styles = StyleSheet.create({
  bannerContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: spaces.M,
    paddingHorizontal: spaces.L,
  },
  bannerTitle: {
    fontFamily: "SemiBold",
    fontSize: textSize.L,
    color: colors.DARK,
  },
  linkText: {
    color: colors.BLUE,
    fontFamily: "SemiBold",
    fontSize: textSize.M,
  },
});

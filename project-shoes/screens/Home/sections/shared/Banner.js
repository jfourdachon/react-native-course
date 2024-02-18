import { StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import { spaces } from "../../../../constants/space";
import TextBoldL from "../../../../ui-components/texts/TextBoldL";
import TextBoldM from "../../../../ui-components/texts/TextBoldM";

const Banner = ({ text }) => {
  const onPress = () => {};
  return (
    <View style={styles.bannerContainer}>
      <TextBoldL>{text}</TextBoldL>
      <TouchableOpacity activeOpacity={0.6}>
        <TextBoldM blue>Voir tout</TextBoldM>
      </TouchableOpacity>
    </View>
  );
};

export default Banner;

const styles = StyleSheet.create({
  bannerContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: spaces.M,
  },
});

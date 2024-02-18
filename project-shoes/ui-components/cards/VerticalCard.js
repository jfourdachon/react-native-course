import { Image, StyleSheet, View } from "react-native";
import React from "react";
import { radius } from "../../constants/radius";
import { spaces } from "../../constants/space";
import { colors } from "../../constants/colors";
import { AntDesign } from "@expo/vector-icons";
import TextRegularS from "../texts/TextRegularS";
import TextBoldL from "../texts/TextBoldL";
import TextMediumM from "../texts/TextMediumM";
import TextMediumS from "../texts/TextMediumS";

const VerticalCard = ({ item, searchInputValue }) => {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.imageContainer}>
        <Image source={item.items[0].image} style={styles.image} />
      </View>
      <View style={styles.descriptionContainer}>
        <View>
          <TextMediumS blue style={styles.bestSellerText}>
            TOP VENTE
          </TextMediumS>
          <TextBoldL numberOfLines={1}>{item.name}</TextBoldL>
        </View>
        <TextMediumM>{item.price} € </TextMediumM>
      </View>
      <View style={styles.btn}>
        <AntDesign name="plus" size={24} color={colors.WHITE} />
      </View>
    </View>
  );
};

export default VerticalCard;

const styles = StyleSheet.create({
  cardContainer: {
    width: 180,
    height: "99%",
    borderRadius: radius.REGULAR,
    padding: spaces.S,
    backgroundColor: colors.WHITE,
    elevation: 1,
    shadowColor: colors.DARK,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  imageContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: spaces.S,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    transform: [
      { rotate: "-20deg" },
      { translateX: -spaces.XS },
      { translateY: -spaces.XS },
    ],
  },
  descriptionContainer: {
    flex: 1,
    justifyContent: "space-between",
    padding: spaces.S,
  },
  bestSellerText: {
    marginBottom: spaces.XS,
  },
  btn: {
    position: "absolute",
    right: 0,
    bottom: 0,
    backgroundColor: colors.BLUE,
    borderTopLeftRadius: radius.REGULAR,
    borderBottomRightRadius: radius.REGULAR,
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
  },
});

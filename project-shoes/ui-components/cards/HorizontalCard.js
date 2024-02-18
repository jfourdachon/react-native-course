import { Image, StyleSheet, View } from "react-native";
import React from "react";
import { colors } from "../../constants/colors";
import { radius } from "../../constants/radius";
import { spaces } from "../../constants/space";
import { textSize } from "../../constants/textSize";
import TextBoldM from "../texts/TextBoldM";
import TextBoldXL from "../texts/TextBoldXL";
import TextMediumM from "../texts/TextMediumM";

const HorizontalCard = ({ item }) => {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.descriptionContainer}>
        <View>
          <TextMediumM blue style={styles.bestChoiceText}>
            MEILLEUR CHOIX
          </TextMediumM>
          <TextBoldXL numberOfLines={1}>{item.name}</TextBoldXL>
        </View>
        <TextBoldM>{item.price} € </TextBoldM>
      </View>
      <View style={styles.imageContainer}>
        <Image source={item.items[0].image} style={styles.image} />
      </View>
    </View>
  );
};

export default HorizontalCard;

const styles = StyleSheet.create({
  cardContainer: {
    height: "80%",
    width: "100%",
    backgroundColor: colors.WHITE,
    borderRadius: radius.REGULAR,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    elevation: 1,
    shadowColor: colors.DARK,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  descriptionContainer: {
    flex: 1,
    height: "80%",
    justifyContent: "space-between",
    padding: spaces.M,
  },
  bestChoiceText: {
    marginBottom: spaces.XS,
  },
  itemName: {
    fontFamily: "Medium",
    fontSize: textSize.XL,
  },
  itemPrice: {
    fontFamily: "SemiBold",
    fontSize: textSize.L,
  },
  imageContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: spaces.M,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
    transform: [
      { rotate: "-20deg" },
      { translateX: -spaces.M },
      { translateY: -spaces.M },
      { scale: 1.9 },
    ],
  },
});

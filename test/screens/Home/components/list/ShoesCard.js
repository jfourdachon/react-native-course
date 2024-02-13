import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { radius } from "../../../../constants/radius";
import { spaces } from "../../../../constants/space";
import { colors } from "../../../../constants/colors";
import { textSize } from "../../../../constants/textSize";
import { AntDesign } from "@expo/vector-icons";
const ShoesCard = ({ item }) => {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.imageContainer}>
        <Image source={item.image} style={styles.image} />
      </View>
      <View style={styles.descriptionContainer}>
        <View>
          <Text style={styles.bestSellerText}>
            {item.bestSeller ? "MEILLEUR VENTE" : ""}
          </Text>
          <Text style={styles.itemName} numberOfLines={1}>
            {item.name}
          </Text>
        </View>
        <Text style={styles.itemPrice}>{item.price} € </Text>
      </View>
      <View style={styles.btn}>
        <AntDesign name="plus" size={24} color={colors.WHITE} />
      </View>
    </View>
  );
};

export default ShoesCard;

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
    padding: spaces.M,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
    transform: [
      { rotate: "-20deg" },
      { translateX: -spaces.S },
      { translateY: -spaces.S },
    ],
  },
  descriptionContainer: {
    flex: 1,
    justifyContent: "space-between",
    padding: spaces.S,
  },
  bestSellerText: {
    color: colors.BLUE,
    fontFamily: "Regular",
    fontSize: textSize.S,
    marginBottom: spaces.XS,
  },
  itemName: {
    fontFamily: "Medium",
    fontSize: textSize.XL,
    color: colors.DARK,
  },
  itemPrice: {
    fontFamily: "SemiBold",
    fontSize: textSize.L,
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

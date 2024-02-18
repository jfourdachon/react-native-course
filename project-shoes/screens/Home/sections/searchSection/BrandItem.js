import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import { radius } from "../../../../constants/radius";
import { colors } from "../../../../constants/colors";
import { spaces } from "../../../../constants/space";
import TextBoldM from "../../../../ui-components/texts/TextBoldM";

const SIZE = 32;
const BrandItem = ({ item, isBrandSelected, selectedBrand, count, index }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() => selectedBrand(item.name)}
      style={{ marginRight: index === count - 1 ? 0 : spaces.M }}
    >
      {isBrandSelected === item.name ? (
        <View style={styles.brandSelectedContainer}>
          <View
            style={{
              backgroundColor: colors.WHITE,
              padding: spaces.S,
              borderRadius: radius.FULL,
            }}
          >
            <Image
              source={item.logo}
              style={{
                width: SIZE,
                height: SIZE,
                resizeMode: "contain",
              }}
            />
          </View>
          <TextBoldM style={styles.brandText}>{item.name}</TextBoldM>
        </View>
      ) : (
        <View
          style={{
            backgroundColor: colors.WHITE,
            padding: spaces.S,
            borderRadius: radius.FULL,
            marginTop: spaces.S,
            elevation: 2,
            shadowColor: colors.DARK,
            shadowOffset: {
              width: 2,
              height: 2,
            },
            shadowOpacity: 0.2,
            shadowRadius: 2,
          }}
        >
          <Image
            source={item.logo}
            style={{
              width: SIZE,
              height: SIZE,
              resizeMode: "contain",
            }}
          />
        </View>
      )}
    </TouchableOpacity>
  );
};

export default BrandItem;

const styles = StyleSheet.create({
  brandSection: {
    flexDirection: "row",
    height: 60,
    marginHorizontal: 24,
    justifyContent: "space-between",
  },
  brandSelectedContainer: {
    flexDirection: "row",
    alignItems: "center",
    height: 60,
    borderRadius: 99,
    backgroundColor: "#5B9EE1",
    paddingLeft: 8,
  },
  brandText: {
    color: colors.WHITE,
    marginHorizontal: spaces.M,
    textTransform: "capitalize",
  },
});

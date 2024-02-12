import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { brands } from "../../../data/brands";
import BrandItem from "../../../ui-components/BrandItem";

const BrandsList = () => {
  const [isBrandSelected, setIsBrandSelected] = useState("nike");
  const selectedBrand = (brand) => {
    setIsBrandSelected(brand);
  };
  return (
    <View style={styles.brandSection}>
      {brands.map((item) => (
        <BrandItem
          item={item}
          isBrandSelected={isBrandSelected}
          selectedBrand={selectedBrand}
        />
      ))}
    </View>
  );
};

export default BrandsList;

const styles = StyleSheet.create({
  brandSection: {
    flexDirection: "row",
    height: 60,
    marginHorizontal: 24,
    justifyContent: "space-between",
  },
});

import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { brands } from "../../../../data/brands";
import BrandItem from "../../../../ui-components/BrandItem";
import { spaces } from "../../../../constants/space";

const BrandsList = () => {
  const [isBrandSelected, setIsBrandSelected] = useState("nike");
  const selectedBrand = (brand) => {
    setIsBrandSelected(brand);
  };
  return (
    <View style={styles.brandSection}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: spaces.L }}
      >
        {brands.map((item, index) => (
          <BrandItem
            key={item.name}
            item={item}
            isBrandSelected={isBrandSelected}
            selectedBrand={selectedBrand}
            index={index}
            count={brands.length}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default BrandsList;

const styles = StyleSheet.create({
  brandSection: {
    flexDirection: "row",
    height: 60,
    justifyContent: "space-between",
  },
});

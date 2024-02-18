import { ScrollView, StyleSheet, View } from "react-native";
import React from "react";
import { brands } from "../../../../data/brands";
import BrandItem from "./BrandItem";
import { spaces } from "../../../../constants/space";

const BrandsList = ({ selectedBrand, selectBrand }) => {
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
            isBrandSelected={selectedBrand}
            selectedBrand={selectBrand}
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

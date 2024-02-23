import { StyleSheet, View } from "react-native";
import React from "react";
import { shoes } from "../../../data/shoes";
import Banner from "../shared/Banner";
import HorizontalCard from "../../../ui-components/cards/HorizontalCard";
import { spaces } from "../../../constants/space";

const NewsSection = ({ selectedBrand }) => {
  const item = shoes
    .find((elem) => elem.brand === selectedBrand)
    .stock.find((item) => item.new);

  return (
    <View style={styles.section}>
      <HorizontalCard item={item} />
      <Banner text="Nouvelles shoes" />
    </View>
  );
};

export default NewsSection;

const styles = StyleSheet.create({
  section: {
    flex: 160,
    width: "100%",
    flexDirection: "column-reverse",
    paddingHorizontal: spaces.L,
    paddingVertical: spaces.M,
  },
});

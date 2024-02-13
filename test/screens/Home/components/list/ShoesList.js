import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import { shoes } from "../../../../data/shoes";
import ShoesCard from "./ShoesCard";
import { spaces } from "../../../../constants/space";
import ItemSeparator from "./ItemSeparator";

const ShoesList = () => {
  return (
    <FlatList
      horizontal
      ItemSeparatorComponent={ItemSeparator}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: spaces.L }}
      data={shoes.filter((elem) => elem.brand === "nike")[0].items}
      keyExtractor={(item) => item.id}
      renderItem={({ item, index }) => <ShoesCard item={item} />}
    />
  );
};

export default ShoesList;

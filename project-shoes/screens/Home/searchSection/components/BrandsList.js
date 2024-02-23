import { FlatList, StyleSheet } from "react-native";
import BrandItem from "./BrandItem";
import { useState } from "react";
import ItemHorizontalSeparator from "./ItemHorizontalSeparator";
import { brands } from "../../../../data/brands";

export default function BrandsList() {
  const [selectedBrand, setSelectedBrand] = useState("nike");
  return (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={false}
      data={brands}
      keyExtractor={(item) => item.name}
      renderItem={({ item, index }) => (
        <BrandItem
          item={item}
          selectedBrand={selectedBrand}
          setSelectedBrand={setSelectedBrand}
          index={index}
        />
      )}
      style={styles.listContainer}
      contentContainerStyle={styles.contentStyle}
      ItemSeparatorComponent={ItemHorizontalSeparator}
    />
  );
}
const styles = StyleSheet.create({
  listContainer: {
    flexGrow: 0,
  },
  contentStyle: {
    justifyContent: "space-between",
  },
});

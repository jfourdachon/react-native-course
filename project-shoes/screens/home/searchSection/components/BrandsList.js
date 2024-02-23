import { FlatList, StyleSheet } from "react-native";
import { brands } from "../../../../data/brands";
import BrandItem from "./BrandItem";
import ItemSeparator from "../../../../ui-components/separators/ListItemSeparator";
import { spaces } from "../../../../constants/spaces";

export default function BrandsList({ selectedBrand, setSelectedBrand }) {
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
      ItemSeparatorComponent={<ItemSeparator width={spaces.S} />}
    />
  );
}
const styles = StyleSheet.create({
  listContainer: {
    flexGrow: 0,
  },
});

import { FlatList, StyleSheet } from "react-native";
import { shoes } from "../../../../data/shoes";
import ItemSeparator from "../../../../ui-components/separators/ListItemSeparator";
import { spaces } from "../../../../constants/spaces";
import VerticalCard from "../../../../ui-components/cards/VerticalCard";
import { useNavigation } from "@react-navigation/core";

export default function ShoesList({ selectedBrand, inputValue }) {
  const navigation = useNavigation();
  const data = shoes
    .find((elem) => elem.brand === selectedBrand)
    .stock.filter((item) => !item.new);

  const fitleredData = inputValue
    ? data.filter((elem) =>
        elem.name.toLowerCase().includes(inputValue.toLowerCase())
      )
    : data;

  const navigateToDetails = (id) => navigation.navigate("Details", { id });
  return (
    <FlatList
      data={fitleredData}
      renderItem={({ item }) => (
        <VerticalCard item={item} onPress={() => navigateToDetails(item.id)} />
      )}
      horizontal
      ItemSeparatorComponent={<ItemSeparator width={spaces.L} />}
      contentContainerStyle={styles.listContainer}
      showsHorizontalScrollIndicator={false}
    />
  );
}

const styles = StyleSheet.create({
  listContainer: {
    paddingHorizontal: spaces.L,
    marginVertical: 4,
  },
});

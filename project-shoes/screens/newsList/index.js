import { View, StyleSheet, FlatList } from "react-native";
import { colors } from "../../constants/colors";
import { shoes } from "../../data/shoes";
import VerticalCard from "../../ui-components/cards/VerticalCard";
import ListItemSeparator from "../../ui-components/separators/ListItemSeparator";
import { spaces } from "../../constants/spaces";

export default function NewsList() {
  const items = shoes.map((brand) => {
    return brand.stock.find((item) => item.new);
  });

  const renderItem = ({ item }) => (
    <View style={styles.cardContainer}>
      <VerticalCard item={item} listScreen />
    </View>
  );
  return (
    <FlatList
      data={items}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      numColumns={2}
      style={styles.container}
      ItemSeparatorComponent={<ListItemSeparator height={spaces.L} />}
      contentContainerStyle={styles.contentStyle}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.LIGHT,
    paddingTop: spaces.L,
  },
  contentStyle: {
    paddingBottom: spaces.XL,
  },
  cardContainer: {
    flex: 0.5,
    height: 240,
    justifyContent: "center",
    alignItems: "center",
  },
});

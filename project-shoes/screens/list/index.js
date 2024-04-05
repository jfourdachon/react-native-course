import { Text, View, StyleSheet, FlatList } from "react-native";
import { colors } from "../../constants/colors";
import { shoes } from "../../data/shoes";
import VerticalCard from "../../ui-components/cards/VerticalCard";
import ListItemSeparator from "../../ui-components/separators/ListItemSeparator";
import { spaces } from "../../constants/spaces";
import { useEffect } from "react";

export default function List({ route, navigation }) {
  const data = shoes.find((elem) => elem.brand === route.params.brand);

  useEffect(() => {
    navigation.setOptions({
      title:
        route.params.brand.charAt(0).toUpperCase() +
        route.params.brand.slice(1),
    });
  }, [route.params.brand]);

  const navigateToDetails = (id) => navigation.navigate("Details", { id });

  const renderItem = ({ item }) => (
    <View style={styles.cardContainer}>
      <VerticalCard
        item={item}
        listScreen
        onPress={() => navigateToDetails(item.id)}
      />
    </View>
  );
  return (
    <FlatList
      data={data.stock}
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

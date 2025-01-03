import { Text, View, StyleSheet, FlatList } from "react-native";
import { colors } from "../../constants/colors";
import { shoes } from "../../data/shoes";
import VerticalCard from "../../ui-components/cards/VerticalCard";
import ListItemSeparator from "../../ui-components/separators/ListItemSeparator";
import { spaces } from "../../constants/spaces";
import { useEffect } from "react";
import { SCREEN_HEIGHT } from "../../constants/sizes";

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
    <View style={styles.container}>
      <FlatList
        data={data.stock}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        ItemSeparatorComponent={<ListItemSeparator height={spaces.L} />}
        contentContainerStyle={styles.contentStyle} // Ajoute un padding en bas
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: SCREEN_HEIGHT,
    paddingVertical: spaces.L,
    paddingBottom: 106,
  },
  cardContainer: {
    flex: 0.5,
    height: 240,
    justifyContent: "center",
    alignItems: "center",
  },
  contentStyle: {
    paddingBottom: spaces.XL,
  },
});

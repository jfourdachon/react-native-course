import { FlatList, StyleSheet } from "react-native";
import { data } from "../data";
import ItemCard from "./ItemCard";
import { padding } from "../constants/padding";

export default function List() {
  return (
    <FlatList
      style={styles.listContainer}
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <ItemCard
          color={item.color}
          title={item.title}
          description={item.description}
          Logo={item.logo}
        />
      )}
    />
  );
}

const styles = StyleSheet.create({
  listContainer: {
    width: "100%",
    paddingHorizontal: padding.HORIZONTAL_SCREEN,
  },
});

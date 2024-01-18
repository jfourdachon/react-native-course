import { View, FlatList, Text, StyleSheet } from "react-native";

export default function ItemsList({ data }) {
  return (
    <View style={styles.resultContainer}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={data}
        renderItem={({ item }) => {
          return (
            <View style={styles.itemContainer}>
              <Text style={styles.item}>{item}</Text>
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  resultContainer: {
    flex: 1,
    width: "100%",
    padding: 8,
  },
  itemContainer: {
    width: "100%",
    height: 38,
    marginVertical: 12,
    borderRadius: 8,
    backgroundColor: "rgba(0,0,0,0.75)",
    justifyContent: "center",
    alignItems: "center",
  },
  item: {
    color: "white",
    fontSize: 20,
  },
});

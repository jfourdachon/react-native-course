import { Text, View, StyleSheet } from "react-native";
import { colors } from "../../constants/colors";
import { shoes } from "../../data/shoes";

export default function NewsList() {
  // const item = shoes
  // .find((elem) => elem.brand === selectedBrand)
  // .stock.find((elem) => elem.new);
  const items = shoes.map((brand) => {
    return brand.stock.filter((item) => item.new);
  });
  console.log(items);
  return (
    <View>
      <Text>News List</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: colors.LIGHT,
  },
});

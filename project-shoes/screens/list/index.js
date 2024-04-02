import { Text, View, StyleSheet } from "react-native";
import { colors } from "../../constants/colors";
import { shoes } from "../../data/shoes";

export default function List({ route }) {
  console.log(route.params);
  const data = shoes.find((elem) => elem.brand === route.params.brand);
  console.log(data);
  return (
    <View>
      <Text>List</Text>
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

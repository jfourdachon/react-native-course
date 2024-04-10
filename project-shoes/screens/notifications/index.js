import { FlatList, StyleSheet, Text, View } from "react-native";
import { shoes } from "../../data/shoes";
import { colors } from "../../constants/colors";
import ItemSeparator from "../../ui-components/separators/ListItemSeparator";
import { spaces } from "../../constants/spaces";
import ListItem from "./components/ListItem";

const ids = ["adi3p", "adi7p", "adi203p"];
export default function Notifications({ navigation }) {
  const data = ids.map((id) =>
    shoes
      .find((item) => item.stock.find((elem) => elem.id === id))
      .stock.find((item) => item.id === id)
  );

  const navigateToDetails = (id) => navigation.navigate("Details", { id });
  const renderItem = ({ item }) => (
    <ListItem item={item} navigateToDetails={navigateToDetails} />
  );
  return (
    <FlatList
      style={styles.container}
      data={data}
      keyExtractor={({ id }) => id}
      ItemSeparatorComponent={<ItemSeparator height={spaces.L} />}
      renderItem={renderItem}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.LIGHT,
    paddingTop: spaces.L,
  },
});

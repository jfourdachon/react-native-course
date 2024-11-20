import { View, StyleSheet, FlatList, ActivityIndicator } from "react-native";
import { colors } from "../../constants/colors";
import { shoes } from "../../data/shoes";
import VerticalCard from "../../ui-components/cards/VerticalCard";
import ListItemSeparator from "../../ui-components/separators/ListItemSeparator";
import { spaces } from "../../constants/spaces";
import { useSelector } from "react-redux";
import TextBoldL from "../../ui-components/texts/TextBoldL";
import { useGetUserByIdQuery } from "../../store/api/userApi";

export default function Favorites({ navigation }) {
  const { userId, token } = useSelector((state) => state.auth);
  const { data: user, isLoading } = useGetUserByIdQuery({ userId, token });

  const data = user?.favoritesIds?.map((id) =>
    shoes
      .find((item) => item.stock.find((elem) => elem.id === id))
      .stock.find((el) => el.id === id)
  );

  const navigateToDetails = (id) => navigation.navigate("Details", { id });

  const renderItem = ({ item }) => (
    <View style={styles.cardContainer}>
      <VerticalCard
        item={item}
        listScreen
        onPress={() => navigateToDetails(item.id)}
        isFavorite
      />
    </View>
  );

  if (isLoading) {
    return (
      <View style={styles.emptyListContainer}>
        <ActivityIndicator size="large" color={colors.DARK} />
      </View>
    );
  }

  if (!user?.favoritesIds?.length) {
    return (
      <View style={styles.emptyListContainer}>
        <TextBoldL>Vous n'avez pas encore de favoris</TextBoldL>
      </View>
    );
  }

  return (
    <FlatList
      data={data}
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
  emptyListContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.LIGHT,
  },
  container: {
    flex: 1,
    backgroundColor: colors.LIGHT,
    paddingTop: spaces.L,
    paddingHorizontal: spaces.XS,
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

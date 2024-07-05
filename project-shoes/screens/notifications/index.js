import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { shoes } from "../../data/shoes";
import { colors } from "../../constants/colors";
import ItemSeparator from "../../ui-components/separators/ListItemSeparator";
import { spaces } from "../../constants/spaces";
import ListItem from "./components/ListItem";

import { useSelector } from "react-redux";
import {
  useGetUserByIdQuery,
  useUpdateUserMutation,
} from "../../store/api/userApi";

const ids = ["adi3p", "adi7p", "adi203p"];
export default function Notifications({ navigation }) {
  const { userId, token } = useSelector((state) => state.auth);
  const { data: user, isLoading } = useGetUserByIdQuery({ userId, token });

  const [updateUser] = useUpdateUserMutation();

  const data = ids.map((id) =>
    shoes
      .find((item) => item.stock.find((elem) => elem.id === id))
      .stock.find((item) => item.id === id)
  );

  const navigateToDetails = (id) => navigation.navigate("Details", { id });

  const updateNotif = (id) => {
    if (user?.seenNotifsIds) {
      updateUser({
        userId,
        token,
        seenNotifsIds: [...user.seenNotifsIds, id],
      });
    } else {
      updateUser({
        userId,
        token,
        seenNotifsIds: [id],
      });
    }
  };

  const renderItem = ({ item }) => (
    <ListItem
      item={item}
      navigateToDetails={navigateToDetails}
      isSeen={user?.seenNotifsIds?.includes(item.id)}
      updateNotif={updateNotif}
    />
  );

  if (isLoading) {
    return (
      <View style={styles.emptyListContainer}>
        <ActivityIndicator size="large" color={colors.DARK} />
      </View>
    );
  }

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
  },
});

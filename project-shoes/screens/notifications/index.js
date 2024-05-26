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
import {
  useAddSeenNotificationsMutation,
  useGetAllSeenNotificationsQuery,
  useUpdateSeenNotificationsMutation,
} from "../../store/api/notificationsApi";

const ids = ["adi3p", "adi7p", "adi203p"];
export default function Notifications({ navigation }) {
  const { data: seenNotifs, isLoading } = useGetAllSeenNotificationsQuery();
  const [addSeenNotif] = useAddSeenNotificationsMutation();
  const [updateSeenNotif] = useUpdateSeenNotificationsMutation();

  const data = ids.map((id) =>
    shoes
      .find((item) => item.stock.find((elem) => elem.id === id))
      .stock.find((item) => item.id === id)
  );

  const navigateToDetails = (id) => navigation.navigate("Details", { id });

  const updateNotif = (id) => {
    if (seenNotifs.id) {
      updateSeenNotif({
        id: seenNotifs.id,
        notifsIds: [...seenNotifs.notifsIds, id],
      });
    } else {
      addSeenNotif(id);
    }
  };

  const renderItem = ({ item }) => (
    <ListItem
      item={item}
      navigateToDetails={navigateToDetails}
      isSeen={seenNotifs?.notifsIds?.includes(item.id)}
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

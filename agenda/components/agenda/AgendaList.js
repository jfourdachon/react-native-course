import {
  FlatList,
  View,
  StyleSheet,
  Text,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import ListItem from "./ListItem";
import { AntDesign } from "@expo/vector-icons";
import { colors } from "../../constants/colors";
import { useState } from "react";
import FormWithFormik from "../modal/FormWithFormik";
import { useGetAllEventsQuery } from "../../store/api/agendaApi";
import { useDispatch, useSelector } from "react-redux";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import { setToken } from "../../store/slices/authSlice";

const Header = ({ openForm, logout }) => (
  <View style={styles.headerContainer}>
    <SimpleLineIcons
      name="logout"
      size={24}
      color={colors.VIOLET}
      onPress={logout}
    />
    <Text style={styles.title}>AGENDA</Text>
    <AntDesign
      name="pluscircle"
      size={32}
      color={colors.PINK}
      suppressHighlighting={true}
      onPress={openForm}
    />
  </View>
);

const ListEmptyComponent = ({ isLoading, error }) => (
  <View style={styles.listEmptyContainer}>
    {isLoading ? <ActivityIndicator color={colors.WHITE} size="large" /> : null}
    {error ? <Text style={styles.errorText}>{error}</Text> : null}
  </View>
);

export default function AgendaList() {
  /**
   * AXIOS and Redux slice
   */
  // const agendaItems = useSelector((state) => state.agenda.events);
  // const dispatch = useDispatch();
  // const getEvents = async () => {
  //   try {
  //     const events = await getAllEvents();
  //     dispatch(setEvents(events));
  //   } catch (error) {
  //     setHttpError(true);
  //   }
  // };

  // useEffect(() => {
  //   setIsLoading(true);
  //   setTimeout(() => {
  //     getEvents();
  //     setIsLoading(false);
  //   }, 2000);
  // }, []);

  // const [isLoading, setIsLoading] = useState(false);
  // const [httpError, setHttpError] = useState(false);

  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.idToken);
  const { data, isLoading: loading, error } = useGetAllEventsQuery(token);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState();

  const openFormHandler = () => setIsFormVisible(true);
  const closeFormHandler = () => {
    setIsFormVisible(false);
    setSelectedEvent();
  };

  const selectEvent = (id) => {
    setSelectedEvent(id);
    setIsFormVisible(true);
  };

  const logout = () => {
    dispatch(setToken());
  };

  return (
    <>
      <FlatList
        data={data}
        keyExtractor={({ id }) => id}
        ItemSeparatorComponent={<View style={{ height: 24 }} />}
        style={styles.listContainer}
        renderItem={({ item }) => (
          <ListItem item={item} selectItem={selectEvent} />
        )}
        ListHeaderComponent={
          <Header openForm={openFormHandler} logout={logout} />
        }
        ListEmptyComponent={
          <ListEmptyComponent isLoading={loading} error={error} />
        }
      />

      <FormWithFormik
        isFormVisible={isFormVisible}
        closeForm={closeFormHandler}
        selectedEvent={selectedEvent}
      />
    </>
  );
}
const styles = StyleSheet.create({
  listEmptyContainer: {
    height: Dimensions.get("screen").height / 1.5,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  errorText: {
    fontSize: 22,
    fontWeight: "700",
    color: colors.WHITE,
    textAlign: "center",
  },
  listContainer: {
    paddingHorizontal: 16,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 80,
    paddingHorizontal: 16,
    backgroundColor: colors.DARK,
  },
  title: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
    color: colors.VIOLET,
  },
});

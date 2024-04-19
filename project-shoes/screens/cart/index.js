import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import ListItem from "./components/ListItem";
import { spaces } from "../../constants/spaces";
import { colors } from "../../constants/colors";
import { radius } from "../../constants/radius";
import TextBoldXL from "../../ui-components/texts/TextBoldXL";
import CustomButton from "../../ui-components/buttons/CustomButton";
import { useHeaderHeight } from "@react-navigation/elements";
import { hideCartScreen } from "../../store/slices/screensSlice";
import { Ionicons } from "@expo/vector-icons";
import TextBoldL from "../../ui-components/texts/TextBoldL";
import ItemSeparator from "../../ui-components/separators/ListItemSeparator";

export default function Cart() {
  const state = useSelector((state) => state.cart);
  const shoes = state.shoes;
  const totalAmount = state.totalAmount;
  const dispatch = useDispatch();
  const hideScreen = () => dispatch(hideCartScreen());

  return (
    <View style={styles.container}>
      <View
        style={{
          height: 60,
          paddingLeft: spaces.L,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <View style={{ flex: 1 }}>
          <Pressable onPress={hideScreen} style={[styles.iconContainer]}>
            <Ionicons name="chevron-back" size={24} color={colors.DARK} />
          </Pressable>
        </View>
        <View style={{ flex: 1 }}>
          <TextBoldL>Mon panier</TextBoldL>
        </View>
        <View style={{ flex: 1 }} />
      </View>
      <FlatList
        data={shoes}
        keyExtractor={({ id }) => id}
        renderItem={({ item }) => <ListItem item={item} />}
        style={styles.listContainer}
        ItemSeparatorComponent={<ItemSeparator height={spaces.L} />}
        ListEmptyComponent={
          <View style={styles.listEmptyContainer}>
            <TextBoldL>Votre panier est vide</TextBoldL>
          </View>
        }
      />
      <View style={styles.bottomContainer}>
        <View style={styles.rowContainer}>
          <TextBoldXL>Sous total</TextBoldXL>
          <TextBoldXL>{totalAmount} €</TextBoldXL>
        </View>
        <View style={styles.rowContainer}>
          <TextBoldXL>Frais de port</TextBoldXL>
          <TextBoldXL>{Math.floor(totalAmount / 15)} €</TextBoldXL>
        </View>
        <View style={styles.dashedLine}></View>
        <View style={styles.rowContainer}>
          <TextBoldXL>Total</TextBoldXL>
          <TextBoldXL>
            {totalAmount + Math.floor(totalAmount / 15)} €
          </TextBoldXL>
        </View>
        <CustomButton text={"Passer la commande"} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.LIGHT,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: radius.FULL,
    backgroundColor: colors.WHITE,
    alignItems: "center",
    justifyContent: "center",
  },
  listContainer: {
    marginTop: spaces.M,
    // flex: 0.6,
  },
  bottomContainer: {
    // flex: 0.4,
    backgroundColor: colors.WHITE,
    borderTopLeftRadius: radius.REGULAR,
    borderTopRightRadius: radius.REGULAR,
    padding: spaces.L,
  },
  rowContainer: {
    flexDirection: "row",
    alignIteyms: "center",
    justifyContent: "space-between",
    marginBottom: spaces.M,
  },
  dashedLine: {
    borderStyle: "dashed",
    borderWidth: 1,
    borderColor: colors.GREY,
    marginBottom: spaces.M,
  },
  listEmptyContainer: {
    height: 560,
    justifyContent: "center",
    alignItems: "center",
  },
});

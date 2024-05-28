import { FlatList, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import ItemSeparator from "../../ui-components/separators/ListItemSeparator";
import { spaces } from "../../constants/spaces";
import { colors } from "../../constants/colors";
import ListItem from "./components/ListItem";
import TextBoldL from "../../ui-components/texts/TextBoldL";
import TextBoldXL from "../../ui-components/texts/TextBoldXL";
import { radius } from "../../constants/radius";
import CustomButton from "../../ui-components/buttons/CustomButton";
import { IS_LARGE_SCREEN } from "../../constants/sizes";
import {
  useGetUserQuery,
  useUpdateUserMutation,
} from "../../store/api/userApi";

export default function Cart() {
  // const state = useSelector((state) => state.cart);
  // const { shoes, totalAmount } = state;
  const userId = useSelector((state) => state.user.id);
  const { data: user, isLoading } = useGetUserQuery(userId);
  const [updateUser] = useUpdateUserMutation();
  if (!user?.cart?.shoes.length) {
    return (
      <View style={styles.listEmptyContainer}>
        <TextBoldL>Votre panier est vide</TextBoldL>
      </View>
    );
  }

  const totalAmount = user?.cart?.totalAmount;

  const removeShoesFromCart = (id) => {
    const shoesToRemove = user?.cart?.shoes.find((el) => el.id === id);
    const newCart = {
      shoes: user?.cart?.shoes.filter((el) => el.id !== id),
      totalAmount:
        user?.cart?.totalAmount - shoesToRemove.price * shoesToRemove.quantity,
    };
    updateUser({ id: userId, cart: newCart });
  };

  const updateQuantity = (id, increase) => {
    const newCart = JSON.parse(JSON.stringify(user?.cart));
    const index = newCart?.shoes.indexOf(
      newCart?.shoes.find((shoes) => shoes.id === id)
    );
    console.log(index);
    if (increase) {
      newCart.shoes[index].quantity = newCart.shoes[index].quantity + 1;
      newCart.totalAmount += newCart.shoes[index].price;
    } else {
      newCart.shoes[index].quantity -= 1;
      newCart.totalAmount -= newCart.shoes[index].price;
    }
    console.log(newCart.shoes[index]);
    updateUser({ id: userId, cart: newCart });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={user?.cart?.shoes}
        showsVerticalScrollIndicator={false}
        keyExtractor={({ id }) => id}
        renderItem={({ item }) => (
          <ListItem
            item={item}
            removeShoesFromCart={removeShoesFromCart}
            updateQuantity={updateQuantity}
          />
        )}
        style={styles.listContainer}
        ItemSeparatorComponent={<ItemSeparator height={spaces.L} />}
        numColumns={IS_LARGE_SCREEN ? 2 : 1}
      />
      <View style={styles.priceContainer}>
        <View style={styles.rowContainer}>
          <TextBoldXL>Sous total</TextBoldXL>
          <TextBoldXL>{totalAmount} €</TextBoldXL>
        </View>
        <View style={styles.rowContainer}>
          <TextBoldXL>Frais de port</TextBoldXL>
          <TextBoldXL>{Math.floor(totalAmount / 15)} €</TextBoldXL>
        </View>

        <View style={styles.dashedLine} />
        <View style={styles.rowContainer}>
          <TextBoldXL>Total</TextBoldXL>
          <TextBoldXL>
            {totalAmount + Math.floor(totalAmount / 15)} €
          </TextBoldXL>
        </View>
        <CustomButton text="Passer la commande" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  listEmptyContainer: {
    flex: 1,
    backgroundColor: colors.LIGHT,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    backgroundColor: colors.LIGHT,
  },
  listContainer: {
    marginTop: spaces.M,
  },
  priceContainer: {
    backgroundColor: colors.WHITE,
    borderTopLeftRadius: radius.REGULAR,
    borderTopRightRadius: radius.REGULAR,
    padding: spaces.XL,
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: spaces.M,
  },
  dashedLine: {
    borderWidth: 1,
    borderColor: colors.GREY,
    borderStyle: "dashed",
    marginBottom: spaces.M,
  },
});

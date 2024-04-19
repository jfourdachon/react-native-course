import { StyleSheet, Image, View, Pressable } from "react-native";
import Touchable from "../../../ui-components/touchable/Touchable";
import TextBoldM from "../../../ui-components/texts/TextBoldM";
import TextMediumM from "../../../ui-components/texts/TextMediumM";
import TextBoldL from "../../../ui-components/texts/TextBoldL";
import TextMediumS from "../../../ui-components/texts/TextMediumS";
import { spaces } from "../../../constants/spaces";
import { colors } from "../../../constants/colors";
import { radius } from "../../../constants/radius";
import { Feather } from "@expo/vector-icons";
import { ICON_SIZE } from "../../../constants/sizes";
import { textSize } from "../../../constants/textSize";
import TextBoldXL from "../../../ui-components/texts/TextBoldXL";
import { useDispatch } from "react-redux";
import {
  deacreaseQuantity,
  increaseQuantity,
  removeShoesFromCart,
} from "../../../store/slices/cartSlice";
import { useState } from "react";

const ListItem = ({ item }) => {
  const dispatch = useDispatch();
  const [iconColor, setIconColor] = useState(colors.GREY);
  const increaseShoesQuantity = () => {
    dispatch(increaseQuantity({ id: item.id }));
  };

  const decreaseShoesQuantity = () => {
    dispatch(deacreaseQuantity({ id: item.id }));
  };

  const removeShoes = () => {
    setIconColor(colors.RED);
    dispatch(removeShoesFromCart({ id: item.id }));
  };
  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        <View style={styles.imageContainer}>
          <Image source={item.image} style={styles.image} />
        </View>
        <View style={[styles.textContainer, styles.centerContainer]}>
          <TextBoldL>{item.name}</TextBoldL>
          <TextBoldL>{item.price} €</TextBoldL>
          <View style={styles.quantityContainer}>
            <Pressable
              style={[
                styles.operationSignContainer,
                styles.substractSignContainer,
              ]}
              onPress={decreaseShoesQuantity}
            >
              <TextBoldXL>-</TextBoldXL>
            </Pressable>
            <TextBoldM style={styles.quantityText}>{item.quantity}</TextBoldM>
            <Pressable
              style={[styles.operationSignContainer, styles.addSignContainer]}
              onPress={increaseShoesQuantity}
            >
              <TextBoldXL style={styles.addSignText}>+</TextBoldXL>
            </Pressable>
          </View>
        </View>
      </View>
      <View style={[styles.textContainer, styles.rightContainer]}>
        <TextBoldL>{item.size}</TextBoldL>
        <Feather
          name="trash-2"
          size={ICON_SIZE}
          color={iconColor}
          suppressHighlighting={true}
          onPress={removeShoes}
        />
      </View>
    </View>
  );
};

export default ListItem;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 140,
    borderWidth: 1,
    borderColor: "transparent",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: spaces.XS,
    paddingHorizontal: spaces.L,
  },
  leftContainer: {
    flexDirection: "row",
  },
  imageContainer: {
    width: 120,
    height: "100%",
    backgroundColor: colors.WHITE,
    borderRadius: radius.REGULAR,
    marginRight: spaces.L,
  },
  image: {
    width: 120,
    height: 120,
    transform: [
      { rotate: "-20deg" },
      { translateX: -spaces.S },
      { translateY: -spaces.S },
    ],
  },
  textContainer: {
    justifyContent: "space-between",
    paddingVertical: spaces.M,
  },
  centerContainer: {
    // maxWidth: "50%",
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  operationSignContainer: {
    width: spaces.XL,
    height: spaces.XL,
    borderRadius: radius.FULL,
    alignItems: "center",
    justifyContent: "center",
  },
  substractSignContainer: {
    backgroundColor: colors.WHITE,
  },
  addSignContainer: {
    backgroundColor: colors.BLUE,
  },
  addSignText: { color: colors.WHITE },
  quantityText: {
    marginHorizontal: spaces.M,
  },
  rightContainer: {
    alignItems: "center",
  },
});

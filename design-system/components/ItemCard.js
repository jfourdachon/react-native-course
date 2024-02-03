import { View, StyleSheet } from "react-native";
import { TextM, TextXL } from "./text";
import { margin } from "../constants/margin";
import { colors } from "../constants/colors";
import { radius } from "../constants/radius";

const CARD_PADDING = 14;

export default function ItemCard({ color, Logo, title, description }) {
  return (
    <View style={[styles.card, { backgroundColor: color }]}>
      <View style={styles.cardContent}>
        <Logo width={50} height={50} color={color} />
        <View style={styles.textContainer}>
          <TextXL>{title}</TextXL>
          <TextM>{description}</TextM>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "100%",
    height: "15%",
    borderWidth: 1,
    marginVertical: margin.VERTICAL_SEPARATOR,
    borderRadius: radius.MEDIUM,
    padding: CARD_PADDING,
  },
  cardContent: {
    width: "100%",
    height: "100%",
    borderRadius: radius.MEDIUM,
    backgroundColor: colors.LIGHT,
    flexDirection: "row",
    alignItems: "center",
    padding: CARD_PADDING,
  },
  textContainer: {
    flex: 1,
    height: "100%",
    paddingLeft: CARD_PADDING,
    justifyContent: "space-evenly",
  },
});

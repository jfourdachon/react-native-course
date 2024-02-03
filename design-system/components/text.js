import { Text, StyleSheet } from "react-native";
import { textSize } from "../constants/textSize";

export const TextXL = ({ children, color }) => (
  <Text style={[styles.textXL, { color }]}>{children}</Text>
);

export const TextM = ({ children }) => (
  <Text style={styles.textM}>{children}</Text>
);

const styles = StyleSheet.create({
  textXL: {
    fontFamily: "Inter-Bold",
    fontSize: textSize.TEXT_XL,
  },
  textM: {
    fontFamily: "Inter-Regular",
    fontSize: textSize.TEXT_M,
  },
});

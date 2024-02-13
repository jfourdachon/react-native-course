import { StyleSheet, Text } from "react-native";
import React from "react";
import { colors } from "../../constants/colors";

const TextM = ({ children, blue = false, styles }) => {
  return (
    <Text
      style={[
        styles.txt,
        { ...styles, color: blue ? colors.BLUE : colors.DARK },
      ]}
    >
      {children}
    </Text>
  );
};

export default TextM;

const styles = StyleSheet.create({
  fontFamily: "Regular",
  fontSize: textSize.M,
});

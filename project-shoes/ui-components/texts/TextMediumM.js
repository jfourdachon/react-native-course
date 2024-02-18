import { StyleSheet, Text } from "react-native";
import React from "react";
import { colors } from "../../constants/colors";
import { textSize } from "../../constants/textSize";

const TextMediumM = ({ children, blue = false, ...props }) => {
  return (
    <Text
      {...props}
      style={[styles.txt, { color: blue ? colors.BLUE : colors.DARK }]}
    >
      {children}
    </Text>
  );
};

export default TextMediumM;

const styles = StyleSheet.create({
  txt: {
    fontFamily: "Medium",
    fontSize: textSize.M,
  },
});

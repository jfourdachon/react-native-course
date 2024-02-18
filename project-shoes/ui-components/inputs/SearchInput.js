import { StyleSheet, TextInput, View } from "react-native";
import React from "react";
import { EvilIcons } from "@expo/vector-icons";
import { colors } from "../../constants/colors";
import { textSize } from "../../constants/textSize";
import { radius } from "../../constants/radius";
import { spaces } from "../../constants/space";

const SearchInput = ({ inputSearchHandler, placeholder }) => {
  const onChangeText = (value) => {
    inputSearchHandler(value);
  };
  return (
    <View style={styles.searchInputContainer}>
      <EvilIcons
        name="search"
        size={32}
        color={colors.GREY}
        style={styles.searchIcon}
      />
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        onChangeText={onChangeText}
      />
    </View>
  );
};

export default SearchInput;

const styles = StyleSheet.create({
  searchInputContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: radius.FULL,
    height: 50,
    marginHorizontal: spaces.L,
  },
  searchIcon: {
    paddingHorizontal: 12,
  },
  input: {
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    // paddingLeft: 0,
    color: colors.GREY,
    fontFamily: "Regular",
    fontSize: textSize.M,
  },
});

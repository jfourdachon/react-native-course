import { StyleSheet, Text, View } from "react-native";
import React from "react";
import BrandsList from "./BrandsList";
import SearchInput from "../../../../ui-components/SearchInput";
import { spaces } from "../../../../constants/space";

const SearchSection = () => {
  return (
    <View
      style={{
        flex: 0.25,
        width: "100%",
        flexDirection: "column",
        paddingTop: spaces.S,
        justifyContent: "space-around",
      }}
    >
      <SearchInput />
      <BrandsList />
    </View>
  );
};

export default SearchSection;

const styles = StyleSheet.create({});

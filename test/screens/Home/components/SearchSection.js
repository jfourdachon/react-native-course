import { StyleSheet, Text, View } from "react-native";
import React from "react";
import SearchInput from "../../../ui-components/SearchInput";
import BrandsList from "./BrandsList";

const SearchSection = () => {
  return (
    <View
      style={{
        flex: 0.23,
        width: "100%",
        flexDirection: "column",
        paddingTop: 12,
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

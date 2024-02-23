import { StyleSheet, View } from "react-native";
import React from "react";
import { spaces } from "../../../constants/space";
import Banner from "../shared/Banner";
import ShoesList from "./ShoesList";

const ListSection = ({ selectedBrand, searchInputValue }) => {
  return (
    <View
      style={{
        flex: 240,
        width: "100%",
        paddingVertical: spaces.S,
      }}
    >
      <View
        style={{
          paddingHorizontal: spaces.L,
        }}
      >
        <Banner text="Shoes Populaires" />
      </View>
      <ShoesList
        selectedBrand={selectedBrand}
        searchInputValue={searchInputValue}
      />
    </View>
  );
};

export default ListSection;

const styles = StyleSheet.create({});

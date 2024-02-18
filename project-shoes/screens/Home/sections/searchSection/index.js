import { StyleSheet, View } from "react-native";
import React from "react";
import BrandsList from "./BrandsList";
import SearchInput from "../../../../ui-components/inputs/SearchInput";
import { spaces } from "../../../../constants/space";

const SearchSection = ({ selectedBrand, selectBrand, inputSearchHandler }) => {
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
      <SearchInput
        inputSearchHandler={inputSearchHandler}
        placeholder={"Trouvez vos shoes"}
      />
      <BrandsList selectedBrand={selectedBrand} selectBrand={selectBrand} />
    </View>
  );
};

export default SearchSection;

const styles = StyleSheet.create({});

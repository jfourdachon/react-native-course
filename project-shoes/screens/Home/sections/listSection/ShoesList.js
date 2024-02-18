import { FlatList } from "react-native";
import React, { useMemo } from "react";
import { shoes } from "../../../../data/shoes";
import VerticalCard from "../../../../ui-components/cards/VerticalCard";
import { spaces } from "../../../../constants/space";
import ItemSeparator from "./ItemSeparator";
import ShoesListEmpty from "./ShoesListEmpty";

const ShoesList = ({ selectedBrand, searchInputValue }) => {
  const data = useMemo(() => {
    return shoes
      .find((elem) => elem.brand === selectedBrand)
      .stock.filter((item) => !item.new);
  }, [selectedBrand]);

  const filteredData = searchInputValue
    ? data.filter((elem) =>
        elem.name.toLowerCase().includes(searchInputValue.toLowerCase())
      )
    : data;
  console.log("flalit");
  return (
    <FlatList
      horizontal
      ItemSeparatorComponent={<ItemSeparator />}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: spaces.L }}
      scrollEnabled={filteredData.length >= 2}
      data={filteredData}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <VerticalCard item={item} searchInputValue={searchInputValue} />
      )}
      ListEmptyComponent={ShoesListEmpty}
    />
  );
};

export default ShoesList;

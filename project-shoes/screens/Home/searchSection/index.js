import { View, StyleSheet } from "react-native";
import { useState } from "react";
import BrandsList from "./components/BrandsList";
import SearchInput from "../../../ui-components/inputs/SearchInput";

export default function SearchSection() {
  const [inputValue, setInputValue] = useState("");
  return (
    <View style={styles.container}>
      <SearchInput
        placeholder="Trouvez vos shoes"
        value={inputValue}
        onChangeText={setInputValue}
      />
      <BrandsList />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    flex: 120,
    justifyContent: "space-evenly",
  },
});

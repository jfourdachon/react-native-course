import { StyleSheet, Text, View } from "react-native";
import React from "react";

const ShoesListEmpty = () => {
  return (
    <View style={styles.container}>
      <Text>Aucun Résultat</Text>
    </View>
  );
};

export default ShoesListEmpty;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: 380,
    justifyContent: "center",
    alignItems: "center",
  },
});

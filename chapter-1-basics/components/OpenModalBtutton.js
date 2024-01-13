import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

export default function OpenModalButton({ onPress }) {
  return (
    <View style={styles.btnContainer}>
      <TouchableOpacity
        activeOpacity={0.9}
        style={styles.btn}
        onPress={onPress}
      >
        <Text style={styles.btnText}>Ajouter un élément</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  btnContainer: {
    flexDirection: "row",
    width: "100%",
    paddingHorizontal: 8,
  },
  btn: {
    width: "100%",
    height: 50,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "violet",
    marginTop: 12,
  },
  btnText: {
    color: "white",
    fontSize: 20,
  },
});

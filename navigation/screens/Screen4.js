import { Pressable, StyleSheet, Text } from "react-native";

export default function Screen4() {
  return (
    <Pressable style={styles.container}>
      <Text>Article 1</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

import { Slot } from "expo-router"
import { SafeAreaView, StyleSheet, Text, View } from "react-native"
import { colors } from "../../constants/colors"

export default function RootLayout() {
  return (
    <SafeAreaView style={styles.layoutContainer}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Articles</Text>
      </View>
      <Slot />
    </SafeAreaView>
  )
}

export const styles = StyleSheet.create({
  layoutContainer: {
    flex: 1,
    backgroundColor: colors.dark,
    alignItems: "center",
  },
  titleContainer: {
    width: "100%",
    alignItems: "center",
    padding: 16,
    marginTop: 12,
    borderBottomWidth: 1,
    borderColor: colors.primary,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    color: colors.primary,
  },
})

import { Link, useLocalSearchParams } from "expo-router"
import { StyleSheet, Text, View } from "react-native"
import { colors } from "../../constants/colors"

export default function ArticleDetailsPage() {
  const { id } = useLocalSearchParams()
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Id de l'article</Text>
      <Text style={styles.title}>{id}</Text>
      <Link href="/articles" style={styles.link}>
        <Text style={styles.text}>Revenir à tous les articles</Text>
      </Link>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },

  title: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    color: colors.light,
  },
  link: {
    padding: 16,
    backgroundColor: colors.primary,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 12,
  },
  text: {
    color: colors.dark,
    fontSize: 20,
  },
})

import { Link, useLocalSearchParams } from "expo-router"
import { StyleSheet, Text, View } from "react-native"
import { colors } from "../../../constants/colors"

export default function FavoritesPage() {
  const params = useLocalSearchParams()
  const ids = JSON.parse(params.ids)
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Les articles favoris</Text>
      {ids.map((id) => (
        <Text style={styles.idsText} key={id}>
          {id}
        </Text>
      ))}
      <Link href="/articles" style={styles.link}>
        <Text style={styles.text}>Revenir à tous les articles</Text>
      </Link>
      <Link href="/" style={styles.link}>
        <Text style={styles.text}>Revenir sur l'écran de bienvenue</Text>
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
  idsText: {
    color: colors.light,
    fontSize: 18,
  },
})

import { Link } from "expo-router"
import { StyleSheet, Text, View } from "react-native"
import { colors } from "../../constants/colors"
import { articeStyles } from "./_layout"

export default function ArticlesPage() {
  return (
    <View style={[styles.container, articeStyles.borderTopPage]}>
      <Text style={styles.title}>Tous les articles</Text>
      <Link
        href={{
          pathname: "/articles/favorites/[ids]",
          params: { ids: JSON.stringify(["1234", "4563", "654356"]) },
        }}
        style={styles.link}
      >
        <Text style={styles.text}>Aller aux articles favoris</Text>
      </Link>
      <Link href="/" style={styles.link}>
        <Text style={styles.text}>Revenir sur l'écran de bienvenue</Text>
      </Link>
      <Link href="/articles/1234" style={styles.link}>
        <Text style={styles.text}>Aller sur le détails d'un article</Text>
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

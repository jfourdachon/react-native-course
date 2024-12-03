import { Link, useRouter } from "expo-router"
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { colors } from "../../constants/colors"
import Drawer from "expo-router/drawer"

export default function NotificationsPage() {
  const router = useRouter()
  return (
    <View style={styles.container}>
      <Drawer.Screen
        options={{
          headerTitleStyle: {
            color: colors.primary,
          },
          title: "Notifications Push",
        }}
      />
      <Text style={styles.title}>Vos notifications</Text>
      {/* <Link href="/articles/new-45" style={styles.link}>
        <Text style={styles.text}>De nouveaux articles sont disponibles</Text>
      </Link> */}
      <TouchableOpacity
        onPress={() => router.push("/articles/new-99")}
        style={styles.link}
      >
        <Text style={styles.text}>De nouveaux articles sont disponibles</Text>
      </TouchableOpacity>
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
  },
  link: {
    padding: 16,
    backgroundColor: colors.dark,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 12,
  },
  text: {
    color: colors.light,
    fontSize: 20,
    textAlign: "center",
  },
})

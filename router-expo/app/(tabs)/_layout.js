import { Tabs } from "expo-router"
import { colors } from "../../constants/colors"
import FontAwesome from "@expo/vector-icons/FontAwesome"
export default function MainLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.light,
        tabBarStyle: {
          backgroundColor: colors.dark,
          height: 80,
          paddingTop: 12,
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
        },
        headerTintColor: colors.light,
        headerTitleAlign: "center",
        headerStyle: {
          backgroundColor: colors.dark,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Accueil",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="home" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Régalges",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="cog" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="about"
        options={{
          title: "À propos",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="question" color={color} />
          ),
        }}
      />
    </Tabs>
  )
}

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Screen3 from "../screens/Screen3";
import { AntDesign, Feather, Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import StackNavigator from "./StackNavigator";
import TopTabsNavigator from "./TopTabsNavigator";
const Tab = createBottomTabNavigator();

export default function BottomTabsNavigator() {
  const inset = useSafeAreaInsets();
  return (
    <Tab.Navigator
      screenOptions={{
        headerShadowVisible: false,
        headerTitleAlign: "center",
        headerStyle: {
          backgroundColor: "#e6e8f5",
        },
        headerTitleStyle: {
          color: "blue",
        },
        tabBarActiveTintColor: "blue",
        tabBarInactiveTintColor: "grey",
        tabBarLabelStyle: {
          fontSize: 16,
        },
        tabBarStyle: {
          height: 80 + inset.bottom,
        },
        tabBarActiveBackgroundColor: "#e6e8f5",
        tabBarShowLabel: false,
        headerShown: false,
      }}
    >
      <Tab.Screen
        component={StackNavigator}
        name="Home"
        options={{
          tabBarIcon: ({ color }) => (
            <AntDesign name="home" size={32} color={color} />
          ),
        }}
      />
      <Tab.Screen
        component={Screen3}
        name="Settings"
        initialParams={{ name: "David" }}
        options={{
          tabBarIcon: ({ color }) => (
            <Feather name="settings" size={32} color={color} />
          ),
        }}
      />
      <Tab.Screen
        component={TopTabsNavigator}
        name="Articles"
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="journal-sharp" size={32} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

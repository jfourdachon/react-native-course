import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Screen1 from "../screens/Screen1";
import Screen3 from "../screens/Screen3";
import { AntDesign, Feather } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
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
      }}
    >
      <Tab.Screen
        component={Screen1}
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
    </Tab.Navigator>
  );
}

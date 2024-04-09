import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import StackNavigator from "./StackNavigator";
import Favorites from "../screens/favorites";
import Cart from "../screens/cart";
import Notifications from "../screens/notifications";
import Profile from "../screens/profile";
import { colors } from "../constants/colors";
import HomeIcon from "../assets/images/navigation/home.svg";
import FavoriteIcon from "../assets/images/navigation/favorite.svg";
import CartIcon from "../assets/images/navigation/cart.svg";
import NotificationsIcon from "../assets/images/navigation/notifications.svg";
import ProfileIcon from "../assets/images/navigation/user.svg";
import { StyleSheet, View } from "react-native";
import { radius } from "../constants/radius";
import CustomTabBar from "./components/CustomTabBar";

const Tabs = createBottomTabNavigator();

export default function BottomTabsNavigator() {
  return (
    <Tabs.Navigator tabBar={(props) => <CustomTabBar {...props} />}>
      <Tabs.Screen
        component={StackNavigator}
        name="HomeStack"
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <HomeIcon width={size} height={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        component={Favorites}
        name="Favorites"
        options={{
          tabBarIcon: ({ color, size }) => (
            <FavoriteIcon width={size} height={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        component={Cart}
        name="Cart"
        options={{
          tabBarIcon: ({ color, focused, size }) => (
            <CartIcon
              width={size}
              height={size}
              color={focused ? colors.WHITE : color}
            />
          ),
        }}
      />
      <Tabs.Screen
        component={Notifications}
        name="Notifications"
        options={{
          tabBarIcon: ({ color, size }) => (
            <NotificationsIcon width={size} height={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        component={Profile}
        name="Profile"
        options={{
          tabBarIcon: ({ color, size }) => (
            <ProfileIcon width={size} height={size} color={color} />
          ),
        }}
      />
    </Tabs.Navigator>
  );
}

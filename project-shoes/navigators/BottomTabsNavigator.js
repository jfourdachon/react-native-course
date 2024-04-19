import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
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
import {
  FOCUSED_ICON_SIZE,
  IS_LARGE_SCREEN,
  SCREEN_WIDTH,
  SMALL_ICON_SIZE,
} from "../constants/sizes";
import { Platform, Pressable, StyleSheet, View } from "react-native";
import { radius } from "../constants/radius";
import BottomTabsBackground from "../assets/images/navigation/bottomTabsBackground.svg";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import HomeStackNavigator from "./HomeStackNavigator";
import DrawerIcon from "../assets/images/navigation/drawer.svg";
import { spaces } from "../constants/spaces";
import { useDispatch, useSelector } from "react-redux";
import { showCartScreen } from "../store/slices/screensSlice";

const Tabs = createBottomTabNavigator();

const originalWidth = 375;
const originalHeight = IS_LARGE_SCREEN ? 212 : 106;
const aspectRatio = originalWidth / originalHeight;

export default function BottomTabsNavigator() {
  const dispatch = useDispatch();
  const badgeCount = useSelector((state) => state.cart.shoes.length);

  const insets = useSafeAreaInsets();
  return (
    <Tabs.Navigator
      screenOptions={({ navigation }) => ({
        unmountOnBlur: true,
        tabBarStyle: {
          height: originalHeight + insets.bottom / 2,
          backgroundColor: colors.LIGHT,
          paddingTop: Platform.select({ ios: insets.bottom, android: 20 }),
          borderTopWidth: 0,
          elevation: 0,
        },
        headerStyle: {
          backgroundColor: colors.LIGHT,
        },
        headerShadowVisible: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: colors.BLUE,
        tabBarInactiveTintColor: colors.GREY,
        tabBarBackground: () => (
          <View style={{ aspectRatio }}>
            <BottomTabsBackground
              width={SCREEN_WIDTH}
              height={"100%"}
              viewBox={`0 0 ${originalWidth} ${originalHeight}`}
            />
          </View>
        ),
        headerTitleAlign: "center",
        headerLeft: () => (
          <Pressable
            style={styles.drawerIconContainer}
            onPress={() => navigation.getParent().openDrawer()}
          >
            <DrawerIcon />
          </Pressable>
        ),
      })}
    >
      <Tabs.Screen
        component={HomeStackNavigator}
        name="HomeStack"
        options={{
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <HomeIcon
              width={focused ? FOCUSED_ICON_SIZE : SMALL_ICON_SIZE}
              height={focused ? FOCUSED_ICON_SIZE : SMALL_ICON_SIZE}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        component={Favorites}
        name="Favorites"
        options={{
          title: "Favoris",
          tabBarIcon: ({ color, focused }) => (
            <FavoriteIcon
              width={focused ? FOCUSED_ICON_SIZE : SMALL_ICON_SIZE}
              height={focused ? FOCUSED_ICON_SIZE : SMALL_ICON_SIZE}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        component={Cart}
        name="Cart"
        listeners={{
          tabPress: (e) => {
            e.preventDefault();
            dispatch(showCartScreen());
          },
        }}
        options={({ navigation }) => ({
          title: "Panier",
          tabBarBadge: badgeCount > 0 ? badgeCount : undefined,
          tabBarBadgeStyle: {
            backgroundColor: colors.LIGHT,
          },
          tabBarIcon: ({ color, focused }) => (
            <Pressable
              style={[
                styles.cartContainer,
                badgeCount ? styles.activeCart : styles.inactiveCart,
              ]}
              onPress={() => dispatch(showCartScreen())}
            >
              <CartIcon
                width={badgeCount > 0 ? FOCUSED_ICON_SIZE : SMALL_ICON_SIZE}
                height={badgeCount > 0 ? FOCUSED_ICON_SIZE : SMALL_ICON_SIZE}
                color={badgeCount > 0 ? colors.WHITE : color}
              />
            </Pressable>
          ),
        })}
      />
      <Tabs.Screen
        component={Notifications}
        name="Notifications"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <NotificationsIcon
              width={focused ? FOCUSED_ICON_SIZE : SMALL_ICON_SIZE}
              height={focused ? FOCUSED_ICON_SIZE : SMALL_ICON_SIZE}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        component={Profile}
        name="Profile"
        options={{
          title: "Profil",
          tabBarIcon: ({ color, focused }) => (
            <ProfileIcon
              width={focused ? FOCUSED_ICON_SIZE : SMALL_ICON_SIZE}
              height={focused ? FOCUSED_ICON_SIZE : SMALL_ICON_SIZE}
              color={color}
            />
          ),
        }}
      />
    </Tabs.Navigator>
  );
}

const styles = StyleSheet.create({
  drawerIconContainer: {
    marginLeft: spaces.L,
  },
  cartContainer: {
    width: 60,
    height: 60,
    borderRadius: radius.FULL,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: Platform.select({ ios: 46, android: 66 }),
  },
  activeCart: {
    backgroundColor: colors.BLUE,
  },
  inactiveCart: {
    backgroundColor: colors.WHITE,
  },
});

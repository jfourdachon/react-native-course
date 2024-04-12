import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import BottomTabsNavigator from "./BottomTabsNavigator";
import { Image, StyleSheet, View } from "react-native";
import TextBoldXL from "../ui-components/texts/TextBoldXL";
import { spaces } from "../constants/spaces";
import { radius } from "../constants/radius";
import { colors } from "../constants/colors";
import { MaterialIcons } from "@expo/vector-icons";
import { SMALL_ICON_SIZE } from "../constants/sizes";
import HomeIcon from "../assets/images/navigation/home.svg";
import ProfileIcon from "../assets/images/navigation/user.svg";
import CartIcon from "../assets/images/navigation/cart.svg";
import NotificationsIcon from "../assets/images/navigation/notifications.svg";
import FavoriteIcon from "../assets/images/navigation/favorite.svg";

const Drawer = createDrawerNavigator();

const routes = [
  { name: "HomeStack", label: "Accueil", icon: HomeIcon, index: 0 },

  { name: "Cart", label: "Panier", icon: CartIcon, index: 2 },
  {
    name: "Notifications",
    label: "Notifications",
    icon: NotificationsIcon,
    index: 3,
  },
  { name: "Profile", label: "Profil", icon: ProfileIcon, index: 4 },
  { name: "Favorites", label: "Favoris", icon: FavoriteIcon, index: 1 },
];

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        drawerStyle: {
          backgroundColor: colors.DARK,
        },
        overlayColor: colors.DARK,
        headerShown: false,
      }}
    >
      <Drawer.Screen component={BottomTabsNavigator} name="BottomTabs" />
    </Drawer.Navigator>
  );
}

function CustomDrawerContent(props) {
  const activeIndex = props.state.routes[0].state.index;
  return (
    <DrawerContentScrollView>
      <View style={styles.userInfosContainer}>
        <Image
          source={{
            uri: "https://i0.wp.com/picjumbo.com/wp-content/uploads/beautiful-nature-mountain-scenery-with-flowers-free-photo.jpg?w=600&quality=80",
          }}
          style={styles.image}
        />
        <TextBoldXL style={styles.text}>John Doe</TextBoldXL>
      </View>
      {/* <DrawerItemList {...props} /> */}
      {routes.map((route) => (
        <DrawerItem
          key={route.name}
          label={route.label}
          icon={() => (
            <route.icon
              width={SMALL_ICON_SIZE}
              height={SMALL_ICON_SIZE}
              color={activeIndex === route.index ? colors.WHITE : colors.GREY}
            />
          )}
          onPress={() => props.navigation.navigate(route.name)}
          labelStyle={[
            styles.label,
            { color: activeIndex === route.index ? colors.WHITE : colors.GREY },
          ]}
        />
      ))}

      <DrawerItem
        label="Déconnexion"
        icon={() => (
          <MaterialIcons
            name="logout"
            size={SMALL_ICON_SIZE}
            color={colors.GREY}
          />
        )}
        labelStyle={[styles.label, { color: colors.GREY }]}
        style={styles.logoutItem}
      />
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  userInfosContainer: {
    marginLeft: spaces.L,
    marginVertical: spaces.XL,
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: radius.FULL,
  },
  text: {
    color: colors.WHITE,
    marginTop: spaces.L,
  },
  label: {
    fontSize: 18,
    fontFamily: "Medium",
  },
  logoutItem: {
    borderTopWidth: 1,
    borderTopColor: colors.GREY,
    paddingTop: spaces.XL,
    marginTop: spaces.XL,
  },
});

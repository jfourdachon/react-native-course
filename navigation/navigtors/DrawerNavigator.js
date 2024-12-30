import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
  createDrawerNavigator,
} from "@react-navigation/drawer"
import Screen7 from "../screens/Screen7"
import { AntDesign, Ionicons, MaterialIcons } from "@expo/vector-icons"
import { Pressable } from "react-native"
import BottomTabsNavigator from "./BottomTabsNavigator"

const Drawer = createDrawerNavigator()

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Group
        screenOptions={({ navigation }) => ({
          headerTitleAlign: "center",
          drawerActiveTintColor: "white",
          drawerInactiveTintColor: "grey",

          headerLeft: () => (
            <Pressable
              style={{ marginLeft: 16 }}
              onPress={() => navigation.openDrawer()}
            >
              <AntDesign name="menu-fold" size={24} color="black" />
            </Pressable>
          ),
          swipeEdgeWidth: 100,
          swipeMinDistance: 20,
          overlayColor: "rgba(0,0,255,0.5)",
        })}
      >
        <Drawer.Screen
          component={BottomTabsNavigator}
          name="Navigation"
          options={({ navigation }) => ({
            drawerLabel: "Home",
            drawerIcon: ({ color }) => (
              <AntDesign name="home" size={24} color={color} />
            ),
            headerRight: () => (
              <Pressable
                style={{ marginRight: 16 }}
                onPress={() =>
                  navigation.navigate("Navigation", {
                    screen: "Home",
                    params: {
                      screen: "Screen2",
                      params: {
                        name: "John",
                      },
                    },
                  })
                }
              >
                <AntDesign name="user" size={24} color="black" />
              </Pressable>
            ),
          })}
        />
        <Drawer.Screen
          component={Screen7}
          name="Notifications"
          options={{
            drawerIcon: ({ color }) => (
              <Ionicons name="notifications" size={24} color={color} />
            ),
          }}
        />
      </Drawer.Group>
    </Drawer.Navigator>
  )
}

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Logout"
        onPress={() => console.log("logout")}
        icon={() => <MaterialIcons name="logout" size={24} color="black" />}
      />
    </DrawerContentScrollView>
  )
}

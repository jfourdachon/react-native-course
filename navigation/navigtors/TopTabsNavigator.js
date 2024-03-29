import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Screen4 from "../screens/Screen4";
import Screen5 from "../screens/Screen5";
import Screen6 from "../screens/Screen6";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Tabs = createMaterialTopTabNavigator();
export default function TopTabsNavigator() {
  const inset = useSafeAreaInsets();
  return (
    <Tabs.Navigator
      screenOptions={{
        tabBarAndroidRipple: { borderless: false },
        tabBarPressColor: "violet",
        // tabBarStyle: {
        //   paddingTop: inset.top,
        // },
        tabBarIndicatorStyle: {
          backgroundColor: "violet",
        },
        tabBarInactiveTintColor: "grey",
        tabBarActiveTintColor: "blue",
        swipeEnabled: false,
        tabBarScrollEnabled: true,
        lazy: true,
        lazyPreloadDistance: 1,
      }}
    >
      <Tabs.Screen component={Screen4} name="Article 1" />
      <Tabs.Screen
        component={Screen5}
        name="Article 2"
        // initialParams={{ name: "Bob" }}
      />
      <Tabs.Screen component={Screen6} name="Article 3" />
    </Tabs.Navigator>
  );
}

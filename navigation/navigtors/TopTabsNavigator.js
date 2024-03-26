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
        tabBarStyle: {
          paddingTop: inset.top,
        },
      }}
    >
      <Tabs.Screen component={Screen4} name="Article 1" />
      <Tabs.Screen component={Screen5} name="Article 2" />
      <Tabs.Screen component={Screen6} name="Article 3" />
    </Tabs.Navigator>
  );
}

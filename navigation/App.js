import { NavigationContainer } from "@react-navigation/native";
import StackNavigator from "./navigtors/StackNavigator";
import BottomTabsNavigator from "./navigtors/BottomTabsNavigator";
import { SafeAreaProvider } from "react-native-safe-area-context";
import TopTabsNavigator from "./navigtors/TopTabsNavigator";

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <TopTabsNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

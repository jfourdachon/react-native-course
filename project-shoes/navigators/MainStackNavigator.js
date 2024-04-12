import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { colors } from "../constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { Pressable } from "react-native";
import Details from "../screens/details";
import BottomTabsNavigator from "./BottomTabsNavigator";
import DrawerNavigator from "./DrawerNavigator";

const Stack = createNativeStackNavigator();

export default function MainStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={() => ({
        headerStyle: {
          backgroundColor: colors.LIGHT,
        },
        headerShadowVisible: false,
        headerTitleAlign: "center",
      })}
    >
      <Stack.Screen
        component={DrawerNavigator}
        name="Drawer"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        component={Details}
        name="Details"
        options={({ navigation }) => ({
          headerLeft: () => (
            <Pressable onPress={() => navigation.goBack()}>
              <Ionicons name="chevron-back" size={24} color={colors.DARK} />
            </Pressable>
          ),
        })}
      />
    </Stack.Navigator>
  );
}

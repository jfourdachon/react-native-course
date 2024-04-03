import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/home";
import List from "../screens/list";
import NewsList from "../screens/newsList";
import { colors } from "../constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { Pressable } from "react-native";
import Details from "../screens/details";

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={({ navigation }) => ({
        headerStyle: {
          backgroundColor: colors.LIGHT,
        },
        headerShadowVisible: false,
        headerTitleAlign: "center",
        headerLeft: () => (
          <Pressable onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={24} color={colors.DARK} />
          </Pressable>
        ),
      })}
    >
      <Stack.Screen
        component={HomeScreen}
        name="Home"
        options={{
          title: "Shoes",
          headerLeft: null,
        }}
      />
      <Stack.Screen component={List} name="List" />
      <Stack.Screen
        component={NewsList}
        name="NewsList"
        options={{
          title: "Nouveautés",
        }}
      />
      <Stack.Screen component={Details} name="Details" />
    </Stack.Navigator>
  );
}

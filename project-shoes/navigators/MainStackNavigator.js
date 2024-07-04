import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { colors } from "../constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { Pressable } from "react-native";
import Details from "../screens/details";
import BottomTabsNavigator from "./BottomTabsNavigator";
import DrawerNavigator from "./DrawerNavigator";
import Cart from "../screens/cart";
import Signup from "../screens/auth/Signup";
import Login from "../screens/auth/Login";
import { useDispatch, useSelector } from "react-redux";
import { setHttpError } from "../store/slices/errorSlice";
import HttpErrorModal from "../ui-components/modals/HttpErrorModal";

const Stack = createNativeStackNavigator();

export default function MainStackNavigator() {
  const token = useSelector((state) => state.auth.token);
  const httpError = useSelector((state) => state.error.httpError);
  const dispatch = useDispatch();
  const closeHttpErrorModal = () => {
    dispatch(setHttpError(false));
  };

  return (
    <>
      <Stack.Navigator
        screenOptions={() => ({
          headerStyle: {
            backgroundColor: colors.LIGHT,
          },
          headerShadowVisible: false,
          headerTitleAlign: "center",
        })}
      >
        {!token ? (
          <>
            <Stack.Screen
              component={Login}
              name="Login"
              options={{ title: "Connexion" }}
            />
            <Stack.Screen
              component={Signup}
              name="Signup"
              options={{
                title: "Formulaire d'inscription",
              }}
            />
          </>
        ) : (
          <>
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
                    <Ionicons
                      name="chevron-back"
                      size={24}
                      color={colors.DARK}
                    />
                  </Pressable>
                ),
              })}
            />
            <Stack.Screen
              component={Cart}
              name="MainCart"
              options={({ navigation }) => ({
                title: "Mon Panier",
                animation: "slide_from_bottom",
                headerLeft: () => (
                  <Pressable onPress={() => navigation.goBack()}>
                    <Ionicons
                      name="chevron-back"
                      size={24}
                      color={colors.DARK}
                    />
                  </Pressable>
                ),
              })}
            />
          </>
        )}
      </Stack.Navigator>
      <HttpErrorModal
        isModalVisible={httpError}
        closeModal={closeHttpErrorModal}
      />
    </>
  );
}

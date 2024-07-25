import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { colors } from "../constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { ActivityIndicator, Pressable, StyleSheet, View } from "react-native";
import Details from "../screens/details";
import DrawerNavigator from "./DrawerNavigator";
import Cart from "../screens/cart";
import Signup from "../screens/auth/Signup";
import Login from "../screens/auth/Login";
import { useDispatch, useSelector } from "react-redux";
import { setHttpError } from "../store/slices/errorSlice";
import HttpErrorModal from "../ui-components/modals/HttpErrorModal";
import { useRefreshTokenMutation } from "../store/api/authApi";
import { useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { setToken, setUserId } from "../store/slices/authSlice";
import SplashScreen from "../screens/splashScreen";
const Stack = createNativeStackNavigator();

export default function MainStackNavigator() {
  const [isAppReady, setIsAppReady] = useState(false);
  const [refreshTokenMutation, { data }] = useRefreshTokenMutation();
  const token = useSelector((state) => state.auth.token);
  const [isLoading, setIsloading] = useState(!token);
  const httpError = useSelector((state) => state.error.httpError);
  const dispatch = useDispatch();
  const closeHttpErrorModal = () => {
    dispatch(setHttpError(false));
  };

  const getAuthenticatedUser = async () => {
    const refreshToken = await SecureStore.getItemAsync("refreshToken");
    if (refreshToken) {
      refreshTokenMutation(refreshToken);
    } else {
      setIsloading(false);
    }
  };

  useEffect(() => {
    if (!token) {
      getAuthenticatedUser();
    }
  }, [token]);

  useEffect(() => {
    if (data) {
      dispatch(setToken(data.id_token));
      dispatch(setUserId(data.user_id));
      SecureStore.setItemAsync("refreshToken", data.refresh_token);
      setIsloading(false);
    }
  }, [data]);

  const appReadyHandler = () => {
    setIsAppReady(true);
  };

  if (!isAppReady) {
    return <SplashScreen appReadyHandler={appReadyHandler} />;
  }

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.LIGHT,
  },
});

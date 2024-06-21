import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Signup from "../components/auth/Signup";
import Login from "../components/auth/Login";
import AgendaList from "../components/agenda/AgendaList";
import { colors } from "../constants/colors";
import { useSelector } from "react-redux";

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
  const token = useSelector((state) => state.auth.idToken);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor: colors.DARK,
          },
        }}
      >
        {token ? (
          <Stack.Screen component={AgendaList} name="Agenda" />
        ) : (
          <>
            <Stack.Screen component={Signup} name="Signup" />
            <Stack.Screen component={Login} name="Login" />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

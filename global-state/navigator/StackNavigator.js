import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Pictures from "../screens/Pictures";
import PicturesDetails from "../screens/PictureDetails";

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen component={Pictures} name="Pictures" />
      <Stack.Screen component={PicturesDetails} name="Picture" />
    </Stack.Navigator>
  );
}

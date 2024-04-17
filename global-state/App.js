if (__DEV__) {
  require("./ReactotronConfig");
}
import { NavigationContainer } from "@react-navigation/native";
import StackNavigator from "./navigator/StackNavigator";
import FavoritesContextProvider from "./context/favoritesContext";
import { Provider } from "react-redux";
import { store } from "./store/store";

export default function App() {
  return (
    // <FavoritesContextProvider>  CONTEXT REACT
    <Provider store={store}>
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>
    </Provider>
    // </FavoritesContextProvider>
  );
}

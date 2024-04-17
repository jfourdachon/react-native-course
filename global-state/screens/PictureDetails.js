import { Image, StyleSheet, View } from "react-native";
import { pictures } from "../data/data";
import { MaterialIcons } from "@expo/vector-icons";
import { useContext, useEffect } from "react";
import { FavoritesContext } from "../context/favoritesContext";
import { useDispatch, useSelector } from "react-redux";
import { addFavorite, removeFavorite } from "../store/slices/favoritesSlice";

export default function PicturesDetails({ route, navigation }) {
  // const favoritesCtx = useContext(FavoritesContext);
  // const isFavorite = favoritesCtx.picturesIds.includes(route.params.id); REACT CONTEXT

  const dispatch = useDispatch();
  const favoritesIds = useSelector((state) => state.favorites.picturesIds);
  const isFavorite = favoritesIds.includes(route.params.id);

  const uri = pictures.find((picture) => picture.id === route.params.id).url;

  const toggleFavoriteStatus = () => {
    if (!isFavorite) {
      dispatch(addFavorite(route.params.id));
    } else {
      dispatch(removeFavorite(route.params.id));
    }
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <MaterialIcons
          name={!isFavorite ? "favorite-outline" : "favorite"}
          size={24}
          color="black"
          onPress={toggleFavoriteStatus}
        />
      ),
    });
  }, [navigation, isFavorite]);

  return <Image source={{ uri }} style={styles.image} />;
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
  },
});

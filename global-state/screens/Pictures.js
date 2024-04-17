import { FlatList, Image, Pressable, StyleSheet } from "react-native";
import { pictures } from "../data/data";
import { useContext } from "react";
import { FavoritesContext } from "../context/favoritesContext";
import { MaterialIcons } from "@expo/vector-icons";
import { useSelector } from "react-redux";

export default function Pictures({ navigation }) {
  // const favoriteCtx = useContext(FavoritesContext);
  const favoritesIds = useSelector((state) => state.favorites.picturesIds);
  const renderItem = ({ item }) => {
    const isFavorite = favoritesIds.includes(item.id);
    return (
      <Pressable
        style={styles.imageContainer}
        onPress={() => navigation.navigate("Picture", { id: item.id })}
      >
        <Image source={{ uri: item.url }} style={styles.image} />
        {isFavorite ? (
          <MaterialIcons
            name="favorite"
            size={32}
            color={"red"}
            style={styles.favoriteIcon}
          />
        ) : null}
      </Pressable>
    );
  };

  return <FlatList data={pictures} numColumns={2} renderItem={renderItem} />;
}

const styles = StyleSheet.create({
  imageContainer: {
    flex: 0.5,
    padding: 8,
  },
  image: {
    flex: 1,
    height: 360,
    borderRadius: 8,
  },
  favoriteIcon: {
    position: "absolute",
    bottom: 20,
    right: 20,
  },
});

import { StyleSheet, View } from "react-native";
import TextMediumM from "../../../ui-components/texts/TextMediumM";
import TextBoldXL from "../../../ui-components/texts/TextBoldXL";
import { spaces } from "../../../constants/spaces";
import { colors } from "../../../constants/colors";
import TextBoldL from "../../../ui-components/texts/TextBoldL";
import { AntDesign } from "@expo/vector-icons";
import { ICON_SIZE } from "../../../constants/sizes";
import {
  useAddFavoriteMutation,
  useGetAllFavoritesQuery,
  useUpdateFavoritesMutation,
} from "../../../store/api/favoritesApi";

export default function DetailsDescription({ name, price, description, id }) {
  const [addToFavorite] = useAddFavoriteMutation();
  const [updateFavorites] = useUpdateFavoritesMutation();
  const { data: favorite, favorites } = useGetAllFavoritesQuery(undefined, {
    selectFromResult: ({ data }) => ({
      data: data?.shoesIds?.find((elem) => elem === id),
      favorites: data,
    }),
  });
  // const isFavorite = favoritesShoesIds.includes(id)
  const iconName = favorite ? "star" : "staro";

  const toggleFavorite = () => {
    if (favorite) {
      updateFavorites({
        id: favorites.id,
        shoesIds: favorites.shoesIds.filter((el) => el !== id),
      });
    } else if (favorites?.id) {
      updateFavorites({
        id: favorites.id,
        shoesIds: [...favorites.shoesIds, id],
      });
    } else {
      addToFavorite(id);
    }
  };

  return (
    <View style={styles.descriptionContainer}>
      <View>
        <TextMediumM blue style={styles.textSpacing}>
          MEILLEUR CHOIX
        </TextMediumM>
        <View style={styles.nameAndFavoriteContainer}>
          <TextBoldXL style={styles.textSpacing}>{name}</TextBoldXL>
          <AntDesign
            name={iconName}
            size={ICON_SIZE}
            color={colors.BLUE}
            onPress={toggleFavorite}
            suppressHighlighting={true}
          />
        </View>
      </View>
      <TextBoldL style={styles.textSpacing}>{price} €</TextBoldL>
      <TextMediumM style={styles.descriptionText}>{description}</TextMediumM>
    </View>
  );
}

const styles = StyleSheet.create({
  descriptionContainer: {
    paddingHorizontal: spaces.L,
  },
  textSpacing: {
    marginBottom: spaces.S,
  },
  nameAndFavoriteContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  descriptionText: {
    color: colors.GREY,
  },
});

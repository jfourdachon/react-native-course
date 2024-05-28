import { StyleSheet, View } from "react-native";
import TextMediumM from "../../../ui-components/texts/TextMediumM";
import TextBoldXL from "../../../ui-components/texts/TextBoldXL";
import { spaces } from "../../../constants/spaces";
import { colors } from "../../../constants/colors";
import TextBoldL from "../../../ui-components/texts/TextBoldL";
import { AntDesign } from "@expo/vector-icons";
import { ICON_SIZE } from "../../../constants/sizes";
import { useDispatch, useSelector } from "react-redux";
import {
  addFavorite,
  removeFavorite,
} from "../../../store/slices/favoritesSlice";
import {
  // useAddFavoriteMutation,
  useGetAllFavoritesQuery,
  useUpdateFavoritesMutation,
} from "../../../store/api/favoritesApi";
import {
  useGetUserQuery,
  useUpdateUserMutation,
} from "../../../store/api/userApi";

export default function DetailsDescription({ name, price, description, id }) {
  const [updateUser] = useUpdateUserMutation();
  const userId = useSelector((state) => state.user.id);

  const { data: user } = useGetUserQuery(userId);
  const isFavorite = user?.favoritesIds?.includes(id);

  const iconName = isFavorite ? "star" : "staro";
  const toggleFavorite = () => {
    if (isFavorite) {
      updateUser({
        id: userId,
        favoritesIds: user.favoritesIds.filter((el) => el !== id),
      });
    } else if (user?.favoritesIds) {
      updateUser({
        id: userId,
        favoritesIds: [...user.favoritesIds, id],
      });
    } else {
      updateUser({
        id: userId,
        favoritesIds: [id],
      });
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

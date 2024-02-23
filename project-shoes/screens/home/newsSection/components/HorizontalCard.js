import { View, StyleSheet, Image } from "react-native";
import TextMediumM from "../../../../ui-components/texts/TextMediumM";
import TextBoldXL from "../../../../ui-components/texts/TextBoldXL";
import TextBoldM from "../../../../ui-components/texts/TextBoldM";
import { colors } from "../../../../constants/colors";
import { radius } from "../../../../constants/radius";
import { spaces } from "../../../../constants/spaces";

export default function HorizontalCard({ item }) {
  return (
    <View style={styles.container}>
      <View style={styles.descriptionContainer}>
        <View>
          <TextMediumM blue>MEILLEUR CHOIX</TextMediumM>
          <TextBoldXL>{item.name}</TextBoldXL>
        </View>
        <TextBoldM>{item.price} €</TextBoldM>
      </View>
      <View style={styles.imageContainer}>
        <Image source={item.items[0].image} style={styles.image} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "80%",
    backgroundColor: colors.WHITE,
    borderRadius: radius.REGULAR,
    justifyContent: "space-between",
    flexDirection: "row",
    marginHorizontal: spaces.L,
  },
  descriptionContainer: {
    flex: 1,
    height: "90%",
    justifyContent: "space-between",
    padding: spaces.L,
  },
  imageContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: spaces.M,
  },
  image: {
    width: "100%",
    height: "100%",
    transform: [
      { rotate: "-20deg" },
      { translateX: -spaces.M },
      { translateY: -spaces.L },
      { scale: 1.3 },
    ],
  },
});

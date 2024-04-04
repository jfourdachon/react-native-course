import { Image, StyleSheet, View } from "react-native";
import TextBoldL from "../../../ui-components/texts/TextBoldL";
import { spaces } from "../../../constants/spaces";
import { colors } from "../../../constants/colors";
import { radius } from "../../../constants/radius";
import Touchable from "../../../ui-components/touchable/Touchable";

export default function Gallery({ images, setSelectedImage, selectedImage }) {
  return (
    <View style={styles.galleryContainer}>
      <TextBoldL>Galerie</TextBoldL>
      <View style={styles.imagesContainer}>
        {images.map((image) => (
          <View key={image} style={styles.imageContainer}>
            <Touchable
              onPress={() => setSelectedImage(image)}
              color={colors.BLUE}
            >
              <View
                style={[
                  styles.imageContainer,
                  image === selectedImage ? styles.selectedImage : undefined,
                ]}
              >
                <Image source={image} style={styles.image} />
              </View>
            </Touchable>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  galleryContainer: {
    paddingHorizontal: spaces.L,
    marginTop: spaces.L,
  },
  imagesContainer: {
    flexDirection: "row",
    marginTop: spaces.M,
  },
  imageContainer: {
    width: 90,
    height: 90,
    backgroundColor: colors.LIGHT,
    borderRadius: radius.REGULAR,
    marginRight: spaces.M,
  },
  selectedImage: {
    borderWidth: 1,
    borderColor: colors.BLUE,
  },
  image: {
    width: 90,
    height: 90,
    transform: [
      { rotate: "-20deg" },
      { translateX: -spaces.S },
      { translateY: -spaces.S },
    ],
  },
});

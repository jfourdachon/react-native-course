import { ScrollView, StyleSheet, Text, View } from "react-native";
import DetailsImage from "./components/DetailsImage";
import { shoes } from "../../data/shoes";
import DetailsDescription from "./components/DetailsDescription";
import Gallery from "./components/Gallery";
import Sizes from "./components/Sizes";
import CustomButton from "../../ui-components/buttons/CustomButton";
import { spaces } from "../../constants/spaces";
import { useEffect, useState } from "react";

export default function Details({ navigation }) {
  const data = shoes[0].stock[0];
  const imageSource = data.items[0].image;
  const images = data.items.map((item) => item.image);
  const sizes = data.items[0].sizes;
  const [selectedImage, setSelectedImage] = useState(data.items[0].image);
  const [selectedSize, setSelectedSize] = useState();

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <DetailsImage source={selectedImage} />
        <DetailsDescription
          name={data.name}
          price={data.price}
          description={data.description}
        />
        <Gallery
          images={images}
          setSelectedImage={setSelectedImage}
          selectedImage={selectedImage}
        />
        <Sizes
          sizes={sizes}
          selectedSize={selectedSize}
          setSelectedSize={setSelectedSize}
        />
        <View style={styles.btnContainer}>
          <CustomButton
            text="Ajouter au panier"
            onPress={() => console.log("ajouter au panier")}
          />
        </View>
        <View style={styles.fixView} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    bottom: 120,
  },
  btnContainer: {
    width: "80%",
    alignSelf: "center",
    maxWidth: 400,
    marginVertical: spaces.XL,
  },
  fixView: {
    marginBottom: -120,
  },
});

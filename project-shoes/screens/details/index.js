import { Platform, ScrollView, StyleSheet, Text, View } from "react-native";
import DetailsImage from "./components/DetailsImage";
import { shoes } from "../../data/shoes";
import DetailsDescription from "./components/DetailsDescription";
import Gallery from "./components/Gallery";
import Sizes from "./components/Sizes";
import CustomButton from "../../ui-components/buttons/CustomButton";
import { spaces } from "../../constants/spaces";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addShoesToCart } from "../../store/slices/cartSlice";

export default function Details({ route, navigation }) {
  const dispatch = useDispatch();
  const data = shoes
    .find((el) => el.stock.find((item) => item.id === route.params.id))
    .stock.find((item) => item.id === route.params.id);

  const images = data.items.map((item) => item.image);
  const [selectedImage, setSelectedImage] = useState(data.items[0].image);
  const [selectedSize, setSelectedSize] = useState();
  const [sizes, setSizes] = useState(data.items[0].sizes);
  const brand = shoes.find((el) =>
    el.stock.find((item) => item.id === route.params.id)
  ).brand;

  useEffect(() => {
    setSizes(data.items.find((el) => el.image === selectedImage).sizes);
    setSelectedSize(
      data.items.find((el) => el.image === selectedImage).sizes[0]
    );
  }, [selectedImage]);

  useEffect(() => {
    navigation.setOptions({
      title: data.gender === "m" ? "Shoes Homme" : "Shoes Femme",
    });
  }, [route.params.id]);

  const addToCart = () =>
    dispatch(
      addShoesToCart({
        id: data.id,
        name: brand.charAt(0).toUpperCase() + brand.slice(1) + " " + data.name,
        image: selectedImage,
        size: selectedSize,
        price: data.price,
        quantity: 1,
      })
    );

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <DetailsImage source={selectedImage} />
        <DetailsDescription
          name={data.name}
          price={data.price}
          description={data.description}
          id={route.params.id}
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
          <CustomButton text="Ajouter au panier" onPress={addToCart} />
        </View>
        <View style={styles.fixView} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    bottom: Platform.select({ android: 80, ios: 100 }),
  },
  btnContainer: {
    width: "80%",
    alignSelf: "center",
    maxWidth: 400,
    marginVertical: spaces.XL,
  },
  fixView: {
    marginBottom: Platform.select({ android: -80, ios: -100 }),
  },
});

import { Platform, ScrollView, StyleSheet, View } from "react-native";
import DetailsImage from "./components/DetailsImage";
import { shoes } from "../../data/shoes";
import DetailsDescription from "./components/DetailsDescription";
import Gallery from "./components/Gallery";
import Sizes from "./components/Sizes";
import CustomButton from "../../ui-components/buttons/CustomButton";
import { spaces } from "../../constants/spaces";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  useGetUserByIdQuery,
  useUpdateUserMutation,
} from "../../store/api/userApi";

export default function Details({ route, navigation }) {
  const { userId, token } = useSelector((state) => state.auth);
  const { data: user } = useGetUserByIdQuery({ userId, token });
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();

  const data = shoes
    .find((el) => el.stock.find((item) => item.id === route.params.id))
    .stock.find((item) => item.id === route.params.id);

  const brand = shoes.find((el) =>
    el.stock.find((item) => item.id === route.params.id)
  ).brand;

  const images = data.items.map((item) => item.image);
  const [selectedImage, setSelectedImage] = useState(data.items[0].image);
  const [selectedSize, setSelectedSize] = useState();
  const [sizes, setSizes] = useState(data.items[0].sizes);

  const addToCart = () => {
    const item = {
      id: data.id + Date.now(),
      name: brand.charAt(0).toUpperCase() + brand.slice(1) + " " + data.name,
      image: selectedImage,
      size: selectedSize,
      price: data.price,
      quantity: 1,
    };
    const shoes = user?.cart?.shoes ? [...user?.cart?.shoes, item] : [item];
    const totalAmount = user?.cart?.totalAmount
      ? user?.cart?.totalAmount + item.price
      : item.price;
    updateUser({
      userId,
      token,
      cart: {
        shoes,
        totalAmount,
      },
    });
  };

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
          <CustomButton
            text="Ajouter au panier"
            onPress={addToCart}
            isLoading={isUpdating}
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

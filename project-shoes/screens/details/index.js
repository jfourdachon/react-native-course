import { StyleSheet, Text, View } from "react-native";
import DetailsImage from "./components/DetailsImage";
import { shoes } from "../../data/shoes";
import DetailsDescription from "./components/DetailsDescription";
import Gallery from "./components/Gallery";

export default function Details() {
  const data = shoes[0].stock[0];
  const imageSource = data.items[0].image;
  const images = data.items.map((item) => item.image);
  return (
    <View style={styles.container}>
      <DetailsImage source={imageSource} />
      <DetailsDescription
        name={data.name}
        price={data.price}
        description={data.description}
      />
      <Gallery images={images} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    bottom: 120,
  },
});

import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { useFonts } from "expo-font";
import { colors } from "./constants/colors";
import { radius } from "./constants/radius";
import { padding } from "./constants/padding";
import { margin } from "./constants/margin";
import { AntDesign, Entypo } from "@expo/vector-icons";
import InternetIcon from "./assets/icons/internet-svgrepo-com.svg";
import { TextM, TextXL } from "./components/text";
import ItemCard from "./components/ItemCard";
import { data } from "./data";

const CARD_PADDING = 14;
export default function App() {
  const [fontLoaded] = useFonts({
    "Inter-Regular": require("./assets/fonts/Inter-Regular.ttf"),
    "Inter-Bold": require("./assets/fonts/Inter-Bold.ttf"),
  });

  return fontLoaded ? (
    <View style={styles.container}>
      <StatusBar style="auto" />
      {data.map((item) => (
        <ItemCard
          color={item.color}
          Logo={item.logo}
          title={item.title}
          description={item.description}
        />
      ))}

      {/* <ItemCard
        color={data[1].color}
        Logo={data[1].logo}
        title={data[1].title}
        description={data[1].description}
      /> */}
      {/* <View style={[styles.card, { backgroundColor: colors.PURPLE }]}>
        <View style={styles.cardContent}>
          <InternetIcon width={32} height={32} color={colors.PURPLE} />
        </View>
      </View>
      <View style={[styles.card, { backgroundColor: colors.ORANGE }]}>
        <View style={styles.cardContent} />
      </View>
      <View style={[styles.card, { backgroundColor: colors.DARK }]}>
        <View style={styles.cardContent} />
      </View> */}
    </View>
  ) : null;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "fff",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: padding.HORIZONTAL_SCREEN,
  },
  card: {
    width: "100%",
    height: "15%",
    borderWidth: 1,
    marginVertical: margin.VERTICAL_SEPARATOR,
    borderRadius: radius.MEDIUM,
    padding: CARD_PADDING,
  },
  cardContent: {
    width: "100%",
    height: "100%",
    borderRadius: radius.MEDIUM,
    backgroundColor: colors.LIGHT,
    flexDirection: "row",
    alignItems: "center",
    padding: CARD_PADDING,
  },
  textContainer: {
    flex: 1,
    height: "100%",
    paddingLeft: CARD_PADDING,
    justifyContent: "space-evenly",
  },
});

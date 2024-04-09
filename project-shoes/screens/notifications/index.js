import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import { shoes } from "../../data/shoes";
import { colors } from "../../constants/colors";
import { radius } from "../../constants/radius";
import { spaces } from "../../constants/spaces";
import ItemSeparator from "../../ui-components/separators/ListItemSeparator";
import TextBoldM from "../../ui-components/texts/TextBoldM";
import TextMediumM from "../../ui-components/texts/TextMediumM";
import TextBoldL from "../../ui-components/texts/TextBoldL";
import TextMediumS from "../../ui-components/texts/TextMediumS";
import Touchable from "../../ui-components/touchable/Touchable";
const ids = ["adi3p", "reb64p", "nik84p"];
export default function Notifications({ navigation }) {
  const data = ids.map((id) => {
    return shoes
      .find((el) => el.stock.find((item) => item.id === id))
      .stock.find((item) => item.id === id);
  });

  const navigateToDetails = (id) =>
    navigation.jumpTo("HomeStack", {
      screen: "Details",
      params: {
        id,
      },
    });

  const renderItem = ({ item }) => (
    <View
      style={{
        width: "100%",
        height: 120,
        flexDirection: "row",
        justifyContent: "space-between",
        borderRadius: radius.REGULAR,
      }}
    >
      <Touchable color={colors.BLUE} onPress={() => navigateToDetails(item.id)}>
        <View
          style={{
            width: "100%",
            height: 120,
            flexDirection: "row",
            justifyContent: "space-between",
            padding: spaces.XS,
          }}
        >
          <View
            style={{
              width: 120,
              height: "100%",
              // backgroundColor: colors.WHITE,
              borderRadius: radius.REGULAR,
            }}
          >
            <Image
              source={item.items[0].image}
              style={{
                width: 120,
                height: "100%",
                transform: [
                  { rotate: "-20deg" },
                  { translateX: -spaces.S },
                  { translateY: -spaces.S },
                ],
              }}
            />
          </View>
          <View
            style={{
              justifyContent: "space-evenly",
              paddingVertical: spaces.S,
            }}
          >
            <TextBoldM>Nouvelle offre</TextBoldM>
            <TextMediumM>{item.name}</TextMediumM>
            <TextBoldL>{item.price}</TextBoldL>
          </View>
          <View>
            <TextMediumS>Il y a 2 jours</TextMediumS>
            <View
              style={{
                width: spaces.S,
                height: spaces.S,
                borderRadius: radius.FULL,
                backgroundColor: colors.BLUE,
                marginTop: spaces.M,
                alignSelf: "flex-end",
              }}
            />
          </View>
        </View>
      </Touchable>
    </View>
  );
  return (
    <FlatList
      data={data}
      keyExtractor={({ id }) => id}
      renderItem={renderItem}
      style={styles.listContainer}
      ItemSeparatorComponent={<ItemSeparator height={spaces.L} />}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.LIGHT,
  },
  listContainer: {
    padding: spaces.L,
    backgroundColor: colors.LIGHT,
  },
});

import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors } from "../../constants/colors";
import {
  FOCUSED_ICON_SIZE,
  SCREEN_WIDTH,
  SMALL_ICON_SIZE,
} from "../../constants/sizes";
import { radius } from "../../constants/radius";
import BottomTabsBackground from "../../assets/images/navigation/bottomTabsBackground.svg";

const originalWidth = 375;
const originalHeight = 106;
const aspectRatio = originalWidth / originalHeight;

export default function CustomTabBar({ state, descriptors, navigation }) {
  return (
    <View style={[styles.container, { aspectRatio }]}>
      {/* <View style={styles.image}> */}
      <BottomTabsBackground
        width="100%"
        height="100%"
        viewBox={`0 0 ${originalWidth} ${originalHeight}`}
        style={{ position: "absolute" }}
      />
      {/* </View> */}
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;

        const onPress = () => {
          if (!isFocused) {
            navigation.navigate(route.name, route.params);
          }
        };

        const color = isFocused ? colors.BLUE : colors.GREY;
        const size = isFocused ? FOCUSED_ICON_SIZE : SMALL_ICON_SIZE;

        return (
          <TouchableOpacity
            onPress={onPress}
            style={styles.navigationItem}
            key={route.name}
          >
            {route.name === "Cart" ? (
              <View
                style={[
                  styles.cartContainer,
                  isFocused ? styles.activeCart : styles.inactiveCart,
                ]}
              >
                {options.tabBarIcon({
                  color: isFocused ? colors.WHITE : color,
                  size,
                })}
              </View>
            ) : (
              options.tabBarIcon({ color, size })
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    backgroundColor: colors.LIGHT,
    width: SCREEN_WIDTH,
  },
  navigationItem: {
    flex: 1,
    alignItems: "center",
  },
  cartContainer: {
    width: 60,
    height: 60,
    borderRadius: radius.FULL,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 46,
  },
  activeCart: {
    backgroundColor: colors.BLUE,
  },
  inactiveCart: {
    backgroundColor: colors.WHITE,
  },
  image: {
    position: "absolute",
    left: 0,
    bottom: 0,
    right: 0,
  },
});

import { TouchableNativeFeedback } from "react-native";
import { colors } from "../../constants/colors";

export default function Touchable({ styles, children, onPress }) {
  return (
    <TouchableNativeFeedback
      style={styles}
      background={TouchableNativeFeedback.Ripple(colors.LIGHT, true)}
      onPress={onPress}
    >
      {children}
    </TouchableNativeFeedback>
  );
}

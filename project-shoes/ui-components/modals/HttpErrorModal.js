import { Modal, StyleSheet, View } from "react-native";
import TextBoldL from "../texts/TextBoldL";
import CustomButton from "../buttons/CustomButton";
import { SCREEN_HEIGHT } from "../../constants/sizes";
import { colors } from "../../constants/colors";
import { radius } from "../../constants/radius";
import { spaces } from "../../constants/spaces";

export default function HttpErrorModal({ isModalVisible, closeModal }) {
  return (
    <Modal visible={isModalVisible} animationType="slide" transparent>
      <View style={styles.container}>
        <TextBoldL style={styles.text}>
          Une erreur est survenue. Veuillez ré-essayer ultérieurement
        </TextBoldL>
        <CustomButton text="OK" onPress={closeModal} />
      </View>
    </Modal>
  );
}
const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    minHeight: SCREEN_HEIGHT / 2.5,
    backgroundColor: colors.GREY,
    borderTopLeftRadius: radius.REGULAR,
    borderTopRightRadius: radius.REGULAR,
    padding: spaces.L,
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  text: {
    textAlign: "center",
    color: colors.LIGHT,
  },
});

import { Dimensions, Modal, StyleSheet, Text, View } from "react-native";
import CustomBtn from "../modal/CustomBtn";
import { colors } from "../../constants/colors";

export default function ErrorModal({ isModalVisible, closeModal, errors }) {
  const close = () => {
    closeModal();
  };
  return (
    <Modal visible={isModalVisible} animationType="slide" transparent>
      <View style={styles.container}>
        {Object.keys(errors)?.map((key, i) => (
          <Text style={styles.text} key={i}>
            &#8226; {errors[key]}
          </Text>
        ))}
      </View>
      <View style={styles.btnContainer}>
        <CustomBtn color={colors.VIOLET} text="OK" onPress={close} />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    minHeight: Dimensions.get("screen").height / 3,
    backgroundColor: colors.WHITE,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 24,
  },
  text: {
    fontSize: 18,
    marginTop: 8,
    marginLeft: 8,
  },
  btnContainer: {
    position: "absolute",
    bottom: 30,
    left: 0,
    right: 0,
    alignItems: "center",
  },
});

import {
  Modal,
  KeyboardAvoidingView,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";
import CustomBtn from "./UI/CustomBtn";

export default function CustomModal({
  isModalVisible,
  inputValue,
  setInputValue,
  onCreateItem,
  onCloseModal,
}) {
  return (
    <Modal visible={isModalVisible} animationType="slide">
      <KeyboardAvoidingView style={styles.keyboardView} behavior="height">
        <View style={styles.modalView}>
          <Image
            source={require("../assets/logo-react-native.png")}
            style={styles.image}
          />
          <View style={styles.formContainer}>
            <TextInput
              value={inputValue}
              onChangeText={setInputValue}
              style={styles.input}
            />
            <View style={styles.modalBtnContainer}>
              <CustomBtn text="Créer" onPress={onCreateItem} color="blue" />
              <CustomBtn text="Fermer" onPress={onCloseModal} color="black" />
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  keyboardView: {
    flex: 1,
  },
  modalView: {
    flex: 1,
    backgroundColor: "grey",
    justifyContent: "space-evenly",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  image: {
    width: 260,
    height: 260,
    borderRadius: 12,
  },
  formContainer: {
    width: "100%",
  },
  input: {
    width: "100%",
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "grey",
    borderRadius: 8,
    height: 42,
    fontSize: 20,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  modalBtnContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
  },
});

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

export default function CustomModal({
  isModalVisible,
  inputValue,
  setInputValue,
  onCreateItem,
  onCloseModal,
}) {
  return (
    <Modal visible={isModalVisible} animationType="slide">
      <KeyboardAvoidingView behavior="height" style={{ flex: 1 }}>
        <View style={styles.modalView}>
          <Image
            source={require("../assets/images/logo-react-native.png")}
            style={styles.image}
          />
          <View style={styles.formContainer}>
            <TextInput
              value={inputValue}
              onChangeText={setInputValue}
              style={styles.input}
            />

            <View style={styles.modalBtnContainer}>
              <TouchableOpacity
                style={[styles.createBtn, styles.modalBtns]}
                onPress={onCreateItem}
              >
                <Text style={styles.modalBtnText}>Créer</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.closeBtn, styles.modalBtns]}
                onPress={onCloseModal}
              >
                <Text style={styles.modalBtnText}>Fermer</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalView: {
    flex: 1,
    backgroundColor: "grey",
    justifyContent: "space-evenly",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 16,
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
  modalBtns: {
    width: "40%",
    height: 50,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 16,
  },
  createBtn: {
    backgroundColor: "blue",
  },
  closeBtn: {
    backgroundColor: "black",
  },
  modalBtnText: {
    color: "white",
    fontSize: 20,
  },
});

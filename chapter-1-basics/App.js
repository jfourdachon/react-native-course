import { useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  View,
  Text,
  TextInput,
  FlatList,
  Modal,
  Image,
  KeyboardAvoidingView,
} from "react-native";
import CustomModal from "./components/CustomModal";
import ItemsList from "./components/ItemsList";
import ModalOpener from "./components/ModalOpener";

export default function App() {
  const [inputValue, setInputValue] = useState("");
  const [inputResult, setInpuResult] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);

  const onOpenModal = () => {
    setModalVisible(true);
  };
  const onCloseModal = () => {
    setModalVisible(false);
  };

  const onCreateItem = () => {
    setInpuResult((prev) => [...prev, inputValue]);
    setInputValue("");
    setModalVisible(false);
  };
  return (
    <SafeAreaView style={styles.container}>
      <ModalOpener onOpenModal={onOpenModal} />
      <ItemsList data={inputResult} />
      <CustomModal
        isModalVisible={isModalVisible}
        inputValue={inputValue}
        setInputValue={setInputValue}
        onCreateItem={onCreateItem}
        onCloseModal={onCloseModal}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
});

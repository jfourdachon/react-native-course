import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { StyleSheet, SafeAreaView } from "react-native";
import CustomModal from "./components/CustomModal";
import ItemsList from "./components/ItemsList";
import OpenModalButton from "./components/OpenModalBtutton";

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
      <OpenModalButton onPress={onOpenModal} />
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

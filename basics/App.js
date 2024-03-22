if (__DEV__) {
  require("./ReactotronConfig");
}
import { useState } from "react";
import { StyleSheet, SafeAreaView, StatusBar } from "react-native";
import CustomModal from "./components/CustomModal";
import ItemsList from "./components/ItemsList";
import ModalOpener from "./components/ModalOpener";
import reactotron from "reactotron-react-native";

export default function App() {
  reactotron.log("Component App Ok");
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
  // reactotron.log("Hello World !");
  fetch("https://jsonplaceholder.typicode.com/todos/1");

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

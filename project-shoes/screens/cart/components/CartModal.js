import {
  Modal,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideCartScreen } from "../../../store/slices/screensSlice";
import Cart from "..";
import TextBoldL from "../../../ui-components/texts/TextBoldL";
import { colors } from "../../../constants/colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const CartModal = () => {
  const insets = useSafeAreaInsets();
  const isModalVisible = useSelector((state) => state.screens.cartScreen);

  return (
    <Modal
      animationType="slide"
      visible={isModalVisible}
      presentationStyle="fullScreen"
    >
      <View
        style={{
          flex: 1,
          backgroundColor: colors.LIGHT,
          paddingTop: insets.top,
        }}
      >
        <Cart />
      </View>
    </Modal>
  );
};

export default CartModal;

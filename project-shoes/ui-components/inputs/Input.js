import { StyleSheet, TextInput, View } from "react-native";
import TextBoldL from "../texts/TextBoldL";
import TextMediumM from "../texts/TextMediumM";
import { spaces } from "../../constants/spaces";
import { radius } from "../../constants/radius";
import { colors } from "../../constants/colors";
import { useState } from "react";
import Feather from "@expo/vector-icons/Feather";
import { SMALL_ICON_SIZE } from "../../constants/sizes";

export default function Input({
  label,
  error,
  errorText,
  type,
  ...inputProps
}) {
  const [isPasswordVisible, setIsPassowrdVisible] = useState(false);
  const inputContainerStyle = [styles.inputContainer];
  if (error) {
    inputContainerStyle.push(styles.inputError);
  }
  const togglePasswordVisibility = () => {
    setIsPassowrdVisible((prev) => !prev);
  };
  return (
    <View style={styles.container}>
      <TextBoldL style={styles.label}>{label}</TextBoldL>
      <View style={inputContainerStyle}>
        <TextInput
          style={styles.input}
          {...inputProps}
          secureTextEntry={type === "password" && !isPasswordVisible}
        />
        {type === "password" ? (
          <Feather
            name={isPasswordVisible ? "eye" : "eye-off"}
            size={SMALL_ICON_SIZE}
            color={colors.DARK}
            onPress={togglePasswordVisibility}
          />
        ) : null}
      </View>
      <View style={styles.errorContainer}>
        {error && errorText ? (
          <TextMediumM style={styles.error}>{errorText}</TextMediumM>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: spaces.L,
  },
  label: {
    marginBottom: spaces.XS,
  },
  inputContainer: {
    width: "100%",
    height: 54,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: radius.REGULAR,
    backgroundColor: colors.WHITE,
    paddingHorizontal: spaces.M,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  inputError: {
    borderColor: colors.RED,
    borderWidth: 1,
  },
  errorContainer: {
    minHeight: spaces.L,
    justifyContent: "center",
  },
  error: {
    color: colors.RED,
  },
});

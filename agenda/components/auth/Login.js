import { useEffect, useState } from "react";
import { useSignMutation } from "../../store/api/authApi";
import AuthForm from "./AuthForm";
import { useDispatch } from "react-redux";
import { setToken } from "../../store/slices/authSlice";
import * as SecureStore from "expo-secure-store";

export default function Login({ navigation }) {
  const dispatch = useDispatch();
  const [signIn, { data, isLoading, error }] = useSignMutation();
  const [httpError, setHttpError] = useState();

  const navigateToSignup = () => {
    navigation.replace("Signup");
  };
  console.log(data);
  const submitFormHandler = (values) => {
    signIn({
      email: values.email,
      password: values.password,
      endpoint: "signInWithPassword",
    }).then((response) => {
      SecureStore.setItemAsync("credentials", JSON.stringify(values));
      SecureStore.setItemAsync("refreshToken", response.data.refreshToken);
    });
  };
  console.log(data);
  useEffect(() => {
    if (data) {
      dispatch(setToken(data.idToken));
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      setHttpError(error);
    }
  }, [error]);

  return (
    <AuthForm
      loginScreen
      navigate={navigateToSignup}
      submitFormHandler={submitFormHandler}
      isLoading={isLoading}
      error={httpError}
      setHttpError={setHttpError}
    />
  );
}

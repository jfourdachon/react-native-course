import { useEffect } from "react";
import { useSignMutation } from "../../store/api/authApi";
import AuthForm from "./AuthForm";
import { useDispatch } from "react-redux";
import { setToken } from "../../store/slices/authSlice";
import * as SecureStore from "expo-secure-store";

export default function Login({ navigation }) {
  const dispatch = useDispatch();
  const [signIn, { data, isLoading, error }] = useSignMutation();
  const navigateToSignup = () => {
    navigation.replace("Signup");
  };
  const submitFormHandler = (values) => {
    signIn({
      email: values.email,
      password: values.password,
      endpoint: "signInWithPassword",
    });
  };

  console.log(error, isLoading);

  useEffect(() => {
    if (data) {
      dispatch(setToken(data.idToken));
    }
  }, [data]);

  return (
    <AuthForm
      loginScreen
      navigate={navigateToSignup}
      submitFormHandler={submitFormHandler}
      isLoading={isLoading}
    />
  );
}

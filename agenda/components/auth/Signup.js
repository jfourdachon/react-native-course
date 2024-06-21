import { useEffect, useState } from "react";
import { useSignMutation } from "../../store/api/authApi";
import AuthForm from "./AuthForm";
import { setToken } from "../../store/slices/authSlice";
import { useDispatch } from "react-redux";

export default function Signup({ navigation }) {
  const dispatch = useDispatch();
  const [signUp, { data, isLoading, error }] = useSignMutation();
  const [httpError, setHttpError] = useState();
  const navigateToLogin = () => {
    navigation.replace("Login");
  };
  const submitFormHandler = (values) => {
    signUp({
      email: values.email,
      password: values.password,
      endpoint: "signUp",
    });
  };
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
      navigate={navigateToLogin}
      submitFormHandler={submitFormHandler}
      isLoading={isLoading}
      error={httpError}
      setHttpError={setHttpError}
    />
  );
}

import { useEffect } from "react";
import { useGetUserQuery, useLazyGetUserQuery } from "../../store/api/userApi";
import AuthForm from "./components/AuthForm";
import { useDispatch } from "react-redux";
import { useSignMutation } from "../../store/api/authApi";
import { setToken, setUserId } from "../../store/slices/authSlice";

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
  useEffect(() => {
    if (data) {
      dispatch(setToken(data.idToken));
      dispatch(setUserId(data.localId));
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

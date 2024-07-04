import { useEffect } from "react";
import { useCreateUserMutation } from "../../store/api/userApi";
import AuthForm from "./components/AuthForm";
import { useDispatch } from "react-redux";
import { setUserId } from "../../store/slices/userSlice";
import { useSignMutation } from "../../store/api/authApi";
import { setToken } from "../../store/slices/authSlice";

export default function Signup({ navigation }) {
  const dispatch = useDispatch();
  const [signUp, { data, isLoading, error }] = useSignMutation();
  const [createUser, { data: user, isLoading: isCreating }] =
    useCreateUserMutation();
  const navigateToLogin = () => {
    navigation.replace("Login");
  };
  const submitFormHandler = async (values) => {
    const response = await signUp({
      email: values.email,
      password: values.password,
      endpoint: "signUp",
    });
    if (!response.error) {
      createUser({
        user: { email: values.email },
        token: response.data.idToken,
        id: response.data.localId,
      });
    }
  };

  useEffect(() => {
    if (data && user) {
      dispatch(setToken(data.idToken));
      dispatch(setUserId(data?.localId));
    }
  }, [data, user]);

  return (
    <AuthForm
      navigate={navigateToLogin}
      submitFormHandler={submitFormHandler}
      isLoading={isLoading || isCreating}
    />
  );
}

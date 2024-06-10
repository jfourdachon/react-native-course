import { useEffect } from "react";
import { useCreateUserMutation } from "../../store/api/userApi";
import AuthForm from "./components/AuthForm";
import { useDispatch } from "react-redux";
import { setUserId } from "../../store/slices/userSlice";

export default function Signup({ navigation }) {
  const dispatch = useDispatch();
  const [createUser, { data, isLoading, isSuccess }] = useCreateUserMutation();
  const navigateToLogin = () => {
    navigation.replace("Login");
  };
  const submitFormHandler = (values) => {
    createUser({ email: values.email });
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch(setUserId(data?.id));
      navigation.replace("Drawer");
    }
  }, [isSuccess]);

  return (
    <AuthForm
      navigate={navigateToLogin}
      submitFormHandler={submitFormHandler}
      isLoading={isLoading}
    />
  );
}

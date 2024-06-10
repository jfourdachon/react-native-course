import { useEffect } from "react";
import { useGetUserQuery, useLazyGetUserQuery } from "../../store/api/userApi";
import AuthForm from "./components/AuthForm";
import { useDispatch } from "react-redux";
import { setUserId } from "../../store/slices/userSlice";

export default function Login({ navigation }) {
  const dispatch = useDispatch();
  const [getUser, { data, isFetching }] = useLazyGetUserQuery();

  const navigateToSignup = () => {
    navigation.replace("Signup");
  };
  const submitFormHandler = (values) => {
    getUser({ email: values.email });
  };
  useEffect(() => {
    if (data?.id) {
      dispatch(setUserId(data.id));
      navigation.replace("Drawer");
    }
  }, [data]);
  return (
    <AuthForm
      loginScreen
      navigate={navigateToSignup}
      submitFormHandler={submitFormHandler}
      isLoading={isFetching}
    />
  );
}

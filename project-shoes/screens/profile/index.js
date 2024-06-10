import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import {
  useGetUserByIdQuery,
  useUpdateUserMutation,
} from "../../store/api/userApi";
import { colors } from "../../constants/colors";
import ProfileForm from "./components/ProfileForm";

export default function Profile() {
  const userId = useSelector((state) => state.user.id);
  const { data: user, isLoading } = useGetUserByIdQuery(userId);
  const [udpateUser, { isLoading: isUpdating }] = useUpdateUserMutation();

  const updateUserProfile = (values) => {
    udpateUser({
      id: userId,
      ...values,
    });
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={colors.DARK} />
      </View>
    );
  }
  return (
    <ProfileForm
      user={user}
      isLoading={isUpdating}
      submitFormHandler={updateUserProfile}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.LIGHT,
  },
});

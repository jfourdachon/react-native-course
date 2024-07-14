import { StyleSheet, TouchableOpacity } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import * as MediaLibrary from "expo-media-library";

export default function PictureButton({ setMarkers, setMissingPermissions }) {
  const [locationStatus, requesLocationPermission] =
    Location.useForegroundPermissions();
  const [cameraStatus, requestCameraPermission] =
    ImagePicker.useCameraPermissions();
  const [libraryStatus, requestLibraryPermission] = MediaLibrary.usePermissions(
    { granularPermissions: ["photo"] }
  );

  const takePictureHandler = async () => {
    let locStatus = locationStatus;
    let camStatus = cameraStatus;
    let mediaStatus = libraryStatus;
    const messages = [];

    if (!locStatus?.granted) {
      locStatus = await requesLocationPermission();
      if (!locStatus.granted) messages.push("Votre localisation");
    }
    if (!camStatus?.granted) {
      camStatus = await requestCameraPermission();
      if (!camStatus.granted) messages.push("Votre appareil photo");
    }
    if (!mediaStatus?.granted) {
      mediaStatus = await requestLibraryPermission();
      if (!mediaStatus.granted) messages.push("Vos photos");
    }
    if (messages.length) {
      setMissingPermissions({
        isPermissionModalVisible: true,
        permissions: messages,
      });
    }
    if (locStatus.granted && camStatus.granted && mediaStatus?.granted) {
      const picture = await ImagePicker.launchCameraAsync();
      if (!picture.canceled) {
        const position = await Location.getCurrentPositionAsync();

        setMarkers((current) => [
          ...current,
          {
            coordinate: {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            },
            isDragging: false,
            imageSource: picture.assets[0].uri,
          },
        ]);
        MediaLibrary.saveToLibraryAsync(picture.assets[0].uri);
      }
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.btn}
      onPress={takePictureHandler}
    >
      <MaterialIcons name="photo-camera" size={30} color="black" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 99,
    borderColor: "black",
    borderWidth: 1,
  },
});

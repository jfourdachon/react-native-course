import { useState, useEffect, useRef } from "react";
import { StyleSheet, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import MarkerItem from "./MarkerItem";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import LocationButton from "./LocationButton";
import PictureButton from "../picture/PictureButton";
import PermissionsModal from "../permissions/PermissionsModal";
import FullPicture from "../picture/FullPicture";
import * as ScreenOrientation from "expo-screen-orientation";
import {
  getAllMarkers,
  insertMarker,
  removeMarker,
  updateMarkerCoordinate,
} from "../../utils/database";

export default function Map({ isDbInitialized }) {
  const [selectedPicture, setSelectedPicture] = useState({
    id: undefined,
    uri: undefined,
  });
  const [missingPermissions, setMissingPermissions] = useState([]);
  const mapRef = useRef();
  const [libraryStatus, requestLibraryPermission] =
    ImagePicker.useMediaLibraryPermissions();
  const [locationStatus, requestLocationPermission] =
    Location.useForegroundPermissions();

  const getUserLocation = async () => {
    let status = locationStatus;
    if (!status?.granted) {
      status = await requestLocationPermission();
    }
    if (status?.granted) {
      const position = await Location.getCurrentPositionAsync();
      mapRef.current?.animateToRegion(
        {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.3,
          longitudeDelta: 0.15,
        },
        2000
      );
    } else {
      setMissingPermissions(["Votre localisation"]);
    }
  };

  useEffect(() => {
    getUserLocation();
  }, []);

  const initialRegion = {
    latitude: 43.8765,
    longitude: 2.712,
    latitudeDelta: 10,
    longitudeDelta: 2,
  };
  const [markers, setMarkers] = useState([]);

  const addMarker = async (event) => {
    event.persist();
    let status = libraryStatus;
    if (!status?.granted) {
      status = await requestLibraryPermission();
    }
    if (status?.granted) {
      const result = await ImagePicker.launchImageLibraryAsync({
        quality: 0.5,
      });
      if (!result.canceled) {
        const { coordinate } = event.nativeEvent;
        const newMarkerId = await insertMarker({
          coordinate,
          imageSource: result.assets[0].uri,
        });
        setMarkers((current) => [
          ...current,
          {
            id: newMarkerId,
            coordinate,
            isDragging: false,
            imageSource: result.assets[0].uri,
          },
        ]);
      }
    } else {
      setMissingPermissions(["Votre galerie d'images"]);
    }
  };
  const dragStartHandler = (id) => () => {
    const markersCopy = [...markers];
    markersCopy.find((el) => el.id === id).isDragging = true;
    setMarkers(markersCopy);
  };
  const dragEndHandler = (id) => (event) => {
    updateMarkerCoordinate({ id, coordinate: event.nativeEvent.coordinate });

    const markersCopy = [...markers];
    markersCopy.find((el) => el.id === id).isDragging = false;
    setMarkers(markersCopy);
  };

  const closePermissionsModal = () => {
    setMissingPermissions([]);
  };

  const displayFullPicture = (id, imageSource) => () => {
    setSelectedPicture({ id, uri: imageSource });
    ScreenOrientation.unlockAsync();
  };

  const closeFullPictureModal = () => {
    setSelectedPicture({ index: undefined, uri: undefined });
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
  };

  const deleteMareker = (id) => () => {
    removeMarker({ id });
    const markersCopy = markers.filter((el) => el.id !== id);
    setMarkers(markersCopy);
    closeFullPictureModal();
  };

  useEffect(() => {
    if (isDbInitialized) {
      getAllMarkers().then((res) => {
        setMarkers(
          res.map((marker) => {
            return {
              id: marker.id,
              coordinate: {
                latitude: marker.latitude,
                longitude: marker.longitude,
              },
              imageSource: marker.imageSource,
              isDragging: false,
            };
          })
        );
      });
    }
  }, [isDbInitialized]);

  return (
    <>
      <MapView
        ref={mapRef}
        showsUserLocation
        style={styles.map}
        initialRegion={initialRegion}
        zoomControlEnabled
        onPress={addMarker}
      >
        {markers?.map((marker) => (
          <Marker
            key={marker.id}
            coordinate={marker.coordinate}
            draggable
            isPreselected
            stopPropagation
            onDragStart={dragStartHandler(marker.id)}
            onDragEnd={dragEndHandler(marker.id)}
            onPress={displayFullPicture(marker.id, marker.imageSource)}
          >
            <MarkerItem
              isDragging={marker.isDragging}
              imageSource={marker.imageSource}
            />
          </Marker>
        ))}
      </MapView>
      <View style={styles.btnsContainer}>
        <LocationButton onPress={getUserLocation} />
        <PictureButton
          setMarkers={setMarkers}
          setMissingPermissions={setMissingPermissions}
        />
        <View style={{ width: 60 }} />
      </View>
      <PermissionsModal
        closeModal={closePermissionsModal}
        permissions={missingPermissions}
        isVisible={missingPermissions.length > 0}
      />
      <FullPicture
        isVisible={!!selectedPicture.id}
        closeModal={closeFullPictureModal}
        imageSource={selectedPicture.uri}
        deleteMarker={deleteMareker(selectedPicture.id)}
      />
    </>
  );
}

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "100%",
  },
  btnsContainer: {
    position: "absolute",
    bottom: 30,
    left: 40,
    right: 40,
    height: 60,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

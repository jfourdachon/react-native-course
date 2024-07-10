import { useState } from "react";
import { StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import MarkerItem from "./MarkerItem";

export default function Map() {
  const initialRegion = {
    latitude: 43.8765,
    longitude: 2.712,
    latitudeDelta: 10,
    longitudeDelta: 2,
  };
  const [markers, setMarkers] = useState([
    { coordinate: { latitude: 43.8765, longitude: 2.712 }, isDragging: false },
  ]);

  const addMarker = (event) => {
    const { coordinate } = event.nativeEvent;
    setMarkers((current) => [
      ...current,
      {
        coordinate,
        isDragging: false,
      },
    ]);
  };
  const dragStartHandler = (index) => () => {
    const markersCopy = [...markers];
    markersCopy[index].isDragging = true;
    setMarkers(markersCopy);
  };
  const dragEndHandler = (index) => () => {
    const markersCopy = [...markers];
    markersCopy[index].isDragging = false;
    setMarkers(markersCopy);
  };
  return (
    <MapView
      style={styles.map}
      initialRegion={initialRegion}
      zoomControlEnabled
      onPress={addMarker}
    >
      {markers.map((marker, index) => (
        <Marker
          key={index}
          coordinate={marker.coordinate}
          draggable
          isPreselected
          stopPropagation
          onDragStart={dragStartHandler(index)}
          onDragEnd={dragEndHandler(index)}
        >
          <MarkerItem isDragging={marker.isDragging} />
        </Marker>
      ))}
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "100%",
  },
});

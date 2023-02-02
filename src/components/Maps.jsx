import React, { useEffect } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const icon = L.icon({
  iconUrl: './placeholder.png',
  iconSize: [38, 38],
});

const position = [51.505, -0.09];

function ResetCenterView(props) {
  const { selectPosition } = props;
  const map = useMap();

  useEffect(() => {
    if (selectPosition) {
      map.setView( //seting map view by its latitue and longitude
        L.latLng(selectPosition?.lat, selectPosition?.lon),
        map.getZoom(),
        {
          animate: true
        }
      )
    }
  }, [selectPosition]);

  return null;
}
//yahan pe kia h change bas.
export default function Map(props) {
  const { selectPosition ,location, temperature} = props;
  const locationSelection = [selectPosition?.lat, selectPosition?.lon];

  return (
    <MapContainer
      center={position}
      zoom={8}
      style={{ width: "100%", height: "300px" }}
    >
      <TileLayer //fetchinf api for map representation
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://api.maptiler.com/maps/basic-v2/256/{z}/{x}/{y}.png?key=DlFY565QKfMKCQM95Jps"
      />
      {selectPosition && (
        <Marker position={locationSelection} icon={icon}>
          <Popup>
          {location}  <br /> {temperature}
          </Popup>
        </Marker>
      )}
      <ResetCenterView selectPosition={selectPosition} />
    </MapContainer>
  );
};


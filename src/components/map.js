import React from "react";

import styled from "styled-components";

import { Map, Marker, Popup, TileLayer } from "react-leaflet";

import "leaflet/dist/leaflet.css";

const StyledMap = styled(Map)`
  height: 50vw;
`;

export const MapWithMarker = ({ location, name, link }) => {
  const position = [
    location.lat,
    location.lng
  ];

  return (
    <StyledMap center={position} zoom={20}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
      />
      <Marker position={position}>
        <Popup>
          <a href={link} target="_blank">{name}</a>
        </Popup>
      </Marker>
    </StyledMap>
  );
}

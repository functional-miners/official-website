import React from "react";

import styled from "styled-components";

import { rhythm } from "../theme/typography";

const MapComponent = styled.iframe`
  margin-bottom: 0;
`;

const MapDescription = styled.p`
  margin-bottom: ${rhythm(1)};
`;

export const MapWithMarker = ({ location, name, link }) => {
  const url = `https://www.openstreetmap.org/?mlat=${location.lat}&amp;mlon=${location.lng}#map=19/${location.lat}/${location.lng}`;

  return (
    <div>
      <div>
        <MapComponent width="300" height="350" frameBorder="0" scrolling="no" marginHeight="0" marginWidth="0" src={link} style={{ border: `1px solid black` }}></MapComponent>
      </div>
      <MapDescription>
        <a href={url} target="_blank">
          {name}
        </a>
      </MapDescription>
    </div>
  );
}

import React from "react";

import { Col, Grid, Row } from "react-flexbox-grid";

export const Schedule = ({ children }) => {
  const elements = children;

  return (
    <Grid fluid>
      <Row center={`xs`}>
        <Col xs={12}>
          <Row center={`xs`}>
            <Col xs={12}>
              {elements}
            </Col>
          </Row>
        </Col>
      </Row>
    </Grid>
  );
};

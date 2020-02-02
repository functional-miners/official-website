import React from "react";

import { Col, Grid, Row } from "react-flexbox-grid";

export class Newsletter extends React.Component {

  componentDidMount() {
    const script = document.createElement("script");

    script.src = "https://white-rook.activehosted.com/f/embed.php?id=4";
    script.async = true;

    document.body.appendChild(script);
  }

  render() {
    return (
      <Grid fluid>
        <Row center={`xs`}>
          <Col xs={12}>
            <Row center={`xs`}>
              <Col xs={12}>
                <div className="_form_4"></div>
              </Col>
            </Row>
          </Col>
        </Row>
      </Grid>
    );
  }
};

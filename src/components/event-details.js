import React from "react";
import Moment from "react-moment";
import Img from "gatsby-image";
import { Col, Grid, Row } from "react-flexbox-grid";
import { faFacebookF, faYoutube } from "@fortawesome/fontawesome-free-brands";
import moment from "moment";

import { CallToAction, Dimmed, TagsList } from "./content";
import { MapWithMarker } from "./map";
import { SocialMediaLink } from "./social-media";
import { renderAst } from "./markdown-components";

import {getImages} from "../utils/image-resolver";

const eventCovers = getImages(require.context(`../images/event-covers`, false, /\.(png|jpe?g)$/));

export const EventDetails = ({ event }) => {
  let info = <span></span>;

  let receivedEvent = event;

  if (typeof (receivedEvent) === `string`) {
    receivedEvent = JSON.parse(receivedEvent);
  }

  const { where, pages, cover } = receivedEvent.frontmatter;

  if (moment(receivedEvent.frontmatter.date).isBefore(moment())) {
    info =
      <Dimmed>
        Event took place <Moment fromNow>{receivedEvent.frontmatter.date}</Moment>.
      </Dimmed>;
  } else {
    info =
      <CallToAction>
        Event will be <Moment fromNow>{receivedEvent.frontmatter.date}</Moment>.
      </CallToAction>;
  }

  let youtubeIcon = null;

  if (pages.youtube) {
    youtubeIcon = <Col>
      <SocialMediaLink href={pages.youtube} icon={faYoutube} />
    </Col>;
  }

  let coverImage = null;

  if (cover) {
    coverImage = <img src={eventCovers[cover]} alt={`Cover image for ${receivedEvent.frontmatter.title}`} />
  }

  return (
    <Grid fluid>
      <Row center={`xs`}>
        <Col xs={12}>
          <Row center={`xs`}>
            <Col xs={12}>
              <h1>{receivedEvent.frontmatter.title}</h1>
              {coverImage}
            </Col>
          </Row>
          <Row center={`xs`}>
            <Col xs={12}>
              <TagsList tags={receivedEvent.frontmatter.tags} />
            </Col>
          </Row>
          <Row center={`xs`}>
            <Col xs={12}>
              <h2>When?</h2>
            </Col>
          </Row>
          <Row center={`xs`}>
            <Col xs={12}>
              <Row center={`xs`}>
                <Col xs={12}>
                  <strong>
                    {info}
                  </strong>
                </Col>
              </Row>
              <Row center={`xs`}>
                <Col xs={12}>
                  <strong>Date</strong>: <Moment format="DD MMMM YYYY">{receivedEvent.frontmatter.date}</Moment>
                </Col>
              </Row>
              <Row center={`xs`}>
                <Col xs={12}>
                  <strong>Time</strong>: <Moment format="HH:mm">{receivedEvent.frontmatter.date}</Moment>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row center={`xs`}>
            <Col xs={12}>
              <h2>Where?</h2>
            </Col>
          </Row>
          <Row center={`xs`}>
            <Col xs={12}>
              <MapWithMarker location={where.location} name={where.name} link={where.link} />
            </Col>
          </Row>
          <Row center={`xs`}>
            <Col xs={12}>
              <h2>Social Media</h2>
            </Col>
          </Row>
          <Row center={`xs`}>
            <Col xs={12}>
              <Row center={`xs`}>
                <Col xs={4}>
                  <Row around={`xs`} >
                    <Col>
                      <SocialMediaLink href={pages.facebook} icon={faFacebookF} />
                    </Col>
                    {youtubeIcon}
                  </Row>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row center={`xs`}>
            <Col xs={12}>
              <h2>Talks and Speakers</h2>
            </Col>
          </Row>
          <Row center={`xs`}>
            <Col xs={12}>
              {renderAst(receivedEvent.htmlAst)}
            </Col>
          </Row>
        </Col>
      </Row>
    </Grid>
  );
};

import React from "react";
import styled from "styled-components";
import { Col, Grid, Row } from "react-flexbox-grid";

import { SocialIcons } from "./icons";

import theme from "../theme/main";
import { rhythm } from "../theme/typography";


// This needs to be fixed:
//
// - It is against `gatsby-image` and image pipeline processing.
// - PROBLEM: How to parametrize GraphQL fragment?
//   - You can't, so we need to do it in different way.

const getImages = function getImages (resolver) {
  return resolver.keys().reduce((accumulator, item) => {
    accumulator[item.replace(`./`, ``)] = resolver(item);
    return accumulator;
  }, {});
};

const peopleAvatars = getImages(require.context(`../images/people`, false, /\.(png|jpe?g)$/));

const Avatar = styled.img`
  margin: 0;
  width: 200px;
  border: 5px solid ${theme.colors.brilliantAzure};
`;

const NiceCol = styled(Col)`
  margin: ${rhythm(0.5)} 0;
`;

const NoMarginCol = styled(Col)`
  margin: 0;

  p {
    margin: 0;
  }
`;

export const PersonProfile = ({ avatar, name, bio, title, abstract, social }) => {
  let titleSection = <span></span>;
  let abstractSection = <span></span>;
  let bioSection = <span></span>;

  const socialProfiles = JSON.parse(social || `{}`);

  if (title && abstract) {
    titleSection =
      <NoMarginCol xs={12}>
        <h4 dangerouslySetInnerHTML={{ __html: `<strong>Title</strong>: ${title}` }} />
      </NoMarginCol>;

    abstractSection =
      <NoMarginCol xs={12}>
        <p dangerouslySetInnerHTML={{ __html: `<strong>Abstract</strong>: ${abstract}` }} />
      </NoMarginCol>
  }

  if (bio) {
    bioSection =
      <NoMarginCol xs={12}>
        <p dangerouslySetInnerHTML={{ __html: `<strong>Bio</strong>: ${bio}` }} />
      </NoMarginCol>;
  }

  return (
    <Grid fluid>
      <Row center={`xs`}>
        {titleSection}
        {abstractSection}
        <NiceCol xs={12}>
          <Avatar src={peopleAvatars[avatar]} alt={name} />
        </NiceCol>
        <Col xs={12}>
          <h5 dangerouslySetInnerHTML={{ __html: name }} />
        </Col>
        {bioSection}
        <NiceCol sm={12} md={4}>
          <SocialIcons social={socialProfiles} />
        </NiceCol>
      </Row>
    </Grid>
  );
};

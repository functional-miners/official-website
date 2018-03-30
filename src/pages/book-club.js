import React from "react";
import Img from "gatsby-image";
import { Col, Row } from "react-flexbox-grid";

import { Paper } from "../components/content";
import { renderAst } from "../components/markdown-components";

export default ({ data }) => {
  const { page, currentBook, lastBook } = data;

  return (
    <Paper>
      <Row center={`xs`}>
        <Col xs={12}>
          <Img resolutions={currentBook.resolutions}
               alt={`Our current book - Scala For Impatient`}
               title={`Our current book - Scala For Impatient`} />
        </Col>
      </Row>
      {renderAst(page.htmlAst)}
      <Row center={`xs`}>
        <Col xs={12}>
          <Img resolutions={lastBook.resolutions}
               alt={`Our last book - The Little Elixir and OTP Guidebook`}
               title={`Our last book - The Little Elixir and OTP Guidebook`} />
        </Col>
      </Row>
    </Paper>
  );
};

export const query = graphql`
  query BookClubPageQuery {
    currentBook : imageSharp(id: { regex: "/book-club/scala-for-impatient/" }) {
      resolutions(width: 300) {
        ...GatsbyImageSharpResolutions
      }
    }

    lastBook : imageSharp(id: { regex: "/book-club/the-little-elixir-and-otp-guidebook/" }) {
      resolutions(width: 300) {
        ...GatsbyImageSharpResolutions
      }
    }

    page : markdownRemark(fields: { slug: { eq: "/book-club/" } }) {
      htmlAst
    }
  }
`;

import React from "react";
import Img from "gatsby-image";

import { Paper } from "../components/content";
import { renderAst } from "../components/markdown-components";

export default ({ data }) => {
  const { page, computerScienceNerdzLogo } = data;

  return (
    <Paper centered={page.frontmatter.centered}>
      {renderAst(page.htmlAst)}
      <Img sizes={computerScienceNerdzLogo.sizes}
           alt={`Do you like PapersWeLove? Stay tuned! ;)`}
           title={`Do you like PapersWeLove? Stay tuned! ;)`} />
    </Paper>
  );
};

export const query = graphql`
  query ComputerScienceNerdzPageQuery {
    computerScienceNerdzLogo : imageSharp(id: { regex: "/cs-nerdz/" }) {
      sizes(maxWidth: 800) {
        ...GatsbyImageSharpSizes
      }
    }

    page : markdownRemark(fields: { slug: { eq: "/computer-science-nerdz/" } }) {
      htmlAst
      frontmatter {
        centered
      }
    }
  }
`;

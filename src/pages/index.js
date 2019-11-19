import React from "react";
import Img from "gatsby-image";
import { withPrefix } from "gatsby-link";

import { Paper } from "../components/content";
import { renderAst } from "../components/markdown-components";

const passPropsToComponentsFromMarkup = function passPropsToComponentsFromMarkup (ast, props) {
  const { url, event, contactFormHandlerUrl, googleRecaptchaSiteKey, facebookAppId } = props;

  ast.children.forEach(subAst => {
    switch (subAst.tagName) {
      case `event-details`:
        subAst.properties.event = JSON.stringify(event);
        break;

      case `social-buttons`:
        subAst.properties.event = JSON.stringify(event);
        subAst.properties.url = url;
        break;

      case `facebook-comments`:
        subAst.properties.appId = facebookAppId;
        subAst.properties.facebookEventPage = event.frontmatter.pages.facebook;
        break;

      case `show-when-facebook-page-is-present`:
        subAst.properties.facebookEventPage = event.frontmatter.pages.facebook;
        break;

      case `contact-form`:
        subAst.properties.googleRecaptchaSiteKey = googleRecaptchaSiteKey;
        subAst.properties.contactFormHandlerUrl = contactFormHandlerUrl;
        break;

      default:
        if (subAst.type === `element`) {
          passPropsToComponentsFromMarkup(subAst, props);
        }
        break;
    }
  });

  return ast;
};

export default ({ data, location }) => {
  const { page, mostRecentEvent } = data;
  const { contactFormHandlerUrl, googleRecaptchaSiteKey, siteUrl, facebookAppId } = data.site.siteMetadata;

  const pathname = withPrefix(location.pathname);
  const url = `${siteUrl}${pathname}`;

  const event = mostRecentEvent.edges[0].node;
  const props = {
    url,
    event,
    googleRecaptchaSiteKey,
    facebookAppId,
    contactFormHandlerUrl,
  };

  return (
    <Paper>
      {renderAst(passPropsToComponentsFromMarkup(page.htmlAst, props))}
      <Img sizes={data.summary.sizes}
           alt={`Summary of talks given in 2017 in our meetup`}
           title={`Summary of talks given in 2017 in our meetup`} />
    </Paper>
  );
};

export const query = graphql`
  query IndexPageQuery {
    site {
      siteMetadata {
        siteUrl
        facebookAppId
        googleRecaptchaSiteKey
        contactFormHandlerUrl
      }
    }

    page : markdownRemark(fields: { slug: { eq: "/" } }) {
      htmlAst
    }

    mostRecentEvent : allMarkdownRemark(
      limit: 1
      filter: { fields: { type: { eq: "events" } } }
      sort: { order: DESC, fields: [ frontmatter___date ] }
    ) {
      edges {
        node {
          htmlAst
          frontmatter {
            title
            date
            tags
            where {
              location {
                lat
                lng
              }
              link
              name
            }
            pages {
              facebook
              meetup
              youtube
            }
            cover
          }
        }
      }
    }

    summary : imageSharp(id: { regex: "/summary-of-past-year/" }) {
      sizes(maxWidth: 800) {
        ...GatsbyImageSharpSizes
      }
    }
  }
`;

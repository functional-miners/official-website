import React from "react";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import styled from "styled-components";

import FacebookProvider, { Comments } from "react-facebook";
import { EmailIcon, EmailShareButton,
         FacebookIcon, FacebookShareButton, FacebookShareCount,
         LinkedinIcon, LinkedinShareButton, LinkedinShareCount,
         TwitterIcon, TwitterShareButton } from "react-share";

import { Dimmed } from "./content";
import { SocialMediaIcon } from "./icons";

import { rhythm } from "../theme/typography";

export const ShowWhenFacebookPageIsPresent = ({ children, facebookEventPage }) => {
  if (!facebookEventPage) {
    return <span></span>;
  }

  return (
    <section>{children}</section>
  );
}

export const SocialMediaLink = ({ href, icon }) => {
  const iconElement = <FontAwesomeIcon icon={icon} />;

  let element = <a href={href} target={`_blank`}>{iconElement}</a>

  if (!href) {
    element = <Dimmed>{iconElement}</Dimmed>;
  }

  return (
    <SocialMediaIcon>{element}</SocialMediaIcon>
  );
}

const SocialButtonsContainer = styled.div`
  margin: ${rhythm(1)} auto;
  width: 70%;

  display: flex;
  flex-order: column;
  justify-content: space-around;

  svg {
    cursor: pointer;
  }

  .share-count {
    text-align: center
  }
`;

export const SocialButtons = ({ event, url }) => {
  const iconSize = 48;

  let receivedEvent = event;

  if (typeof (receivedEvent) === `string`) {
    receivedEvent = JSON.parse(receivedEvent);
  }

  const excerpt = receivedEvent.frontmatter.tags.join(`, `);

  const filter = count => {
    if (count > 0) {
      return count;
    }

    return ``;
  };

  return (
    <SocialButtonsContainer>
      <EmailShareButton url={url} subject={`${receivedEvent.frontmatter.title} - ${url}`} body={excerpt}>
        <EmailIcon round size={iconSize} />
      </EmailShareButton>

      <FacebookShareButton url={url} quote={excerpt}>
        <FacebookIcon round size={iconSize} />
        <FacebookShareCount url={url}>
          {count => <div className="share-count">{filter(count)}</div>}
        </FacebookShareCount>
      </FacebookShareButton>

      <LinkedinShareButton url={url} title={receivedEvent.frontmatter.title} description={excerpt}>
        <LinkedinIcon round size={iconSize} />
        <LinkedinShareCount url={url}>
          {count => <div className="share-count">{filter(count)}</div>}
        </LinkedinShareCount>
      </LinkedinShareButton>

      <TwitterShareButton url={url} title={receivedEvent.frontmatter.title}>
        <TwitterIcon round size={iconSize} />
      </TwitterShareButton>
    </SocialButtonsContainer>
  );
};

export const FacebookComments = ({ appId, facebookEventPage }) => {
  if (!facebookEventPage) {
    return <span></span>;
  }

  return (
    <FacebookProvider appId={appId}>
      <Comments href={facebookEventPage} width={`100%`} />
    </FacebookProvider>
  );
};

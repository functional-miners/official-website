import React from "react";
import styled, { css } from "styled-components";

import { PlainList, PlainListItem } from "./lists";

import theme from "../theme/main";
import { rhythm } from "../theme/typography";

const SIZES = {
  laptopL: 1441,
  laptop: 1025,
  tablet: 769,
  phoneL: 426,
  phoneM: 376,
  phoneS: 321,
};

export const styles = {
  content: () => css`
    margin: 0 auto;
    max-width: ${theme.content.maxWidthPx}px;
    padding: 0 ${rhythm(1)};
  `,

  media: Object.keys(SIZES).reduce((accumulator, label) => {
    const emSize = SIZES[label] / 16;

    accumulator[label] = (...args) => css`
      @media (max-width: ${emSize}em) {
        ${css(...args)}
      }
    `;

    return accumulator;
  }, {}),
};

export const Dimmed = styled.span`
  color: ${theme.colors.gray};
`;

export const CallToAction = styled.span`
  color: ${theme.colors.mayaBlue};
`;

export const Paper = styled.article`
  position: relative;

  margin: ${rhythm(1)} 0;

  background-color: ${theme.colors.white};
  padding: ${rhythm(0.5)} ${rhythm(1.5)};

  ${props => !props.noShadow && css`
    box-shadow: 0 0.5rem 1rem 0.1rem ${theme.colors.shadow};
  `}

  ${props => props.centered && css`
    text-align: center;
  `}

  ${styles.media.phoneM`
    padding: ${rhythm(0.5)} ${rhythm(0.25)};
  `}

  h1, h2, h3, h4, h5, h6 {
    a {
      color: ${theme.colors.foreground};
      background-image: none;

      svg {
        display: none;
      }
    }
  }

  ul {
    margin-top: 0;

    li {
      margin-bottom: ${rhythm(0.25)};

      p {
        margin-bottom: ${rhythm(0.25)};
      }
    }
  }
`;

export const ParagraphAlignedToRight = styled.p`
  text-align: right;
`;

const EvenlySpacedList = PlainList.extend`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-evenly;
`;

const Tag = PlainListItem.extend`
  font-size: ${rhythm(0.5)};
  font-family: ${theme.fonts.headerFontFamily};
  font-weight: bold;

  padding: ${rhythm(0.1)} ${rhythm(0.5)};

  border: 3px solid ${theme.colors.brilliantAzure};
  border-radius: 10px;

  color: ${theme.colors.white};
  background-color: ${theme.colors.mayaBlue};

  white-space: nowrap;

  ${props => !props.noShadow && css`
    box-shadow: 0 0.5rem 1rem 0.1rem ${theme.colors.shadow};
  `}
`;

export const TagsList = ({ tags }) => (
  <EvenlySpacedList>
    {tags.map((tag, index) => <Tag key={index}>{tag}</Tag>)}
  </EvenlySpacedList>
);

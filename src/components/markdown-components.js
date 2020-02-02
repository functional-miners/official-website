import React from "react";
import RehypeReact from "rehype-react";

import { Col, Grid, Row } from "react-flexbox-grid";

import { EventDetails } from "./event-details";
import { ContactForm } from "./forms";
import { Newsletter } from "./newsletter";
import { HomeIcon } from "./icons";
import { PersonProfile } from "./images";
import { Schedule } from "./schedule";
import { FacebookComments, SocialButtons, ShowWhenFacebookPageIsPresent } from "./social-media";

const components = {
  "col": Col,
  "grid": Grid,
  "row": Row,

  "schedule": Schedule,
  "event-details": EventDetails,
  "contact-form": ContactForm,
  "person-profile": PersonProfile,
  "newsletter": Newsletter,

  "show-when-facebook-page-is-present": ShowWhenFacebookPageIsPresent,
  "social-buttons": SocialButtons,
  "facebook-comments": FacebookComments,

  "home-icon": HomeIcon,
};

export const renderAst = new RehypeReact({ createElement: React.createElement, components }).Compiler;

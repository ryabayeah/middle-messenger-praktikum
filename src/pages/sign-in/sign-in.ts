import Handlebars from "handlebars";
import template from "./sign-in.hbs?raw";
import "./sign-in.scss";

export const SignIn = () => {
  const handleAltClick = () => {
    document.location = "/profile";
  };

  return Handlebars.compile(template)({
    onClickAlt: handleAltClick,
  });
};

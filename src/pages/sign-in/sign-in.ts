import Handlebars from "handlebars";
import template from "./sign-in.hbs?raw";
import "./sign-in.scss";

export const SignIn = () => {
  return Handlebars.compile(template)({});
};

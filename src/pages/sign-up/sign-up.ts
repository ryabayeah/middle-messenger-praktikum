import Handlebars from "handlebars";
import template from "./sign-up.hbs?raw";
import "./sign-up.scss";

export const SignUp = () => {
  return Handlebars.compile(template)({ });
};

import Handlebars from "handlebars";
import template from "./error-layout.hbs?raw";
import "./error-layout.scss";

export default (props={}) => {
  return Handlebars.compile(template)(props);
};

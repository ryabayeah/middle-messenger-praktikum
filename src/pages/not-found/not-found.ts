import Handlebars from "handlebars";
import template from "./not-found.hbs?raw";

export const NotFound = () => {
  return Handlebars.compile(template)({});
};

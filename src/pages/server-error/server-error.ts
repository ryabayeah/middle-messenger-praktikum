import Handlebars from "handlebars";
import template from "./server-error.hbs?raw";

export const ServerError = () => {
  return Handlebars.compile(template)({});
};

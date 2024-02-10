import Handlebars from "handlebars";
import mainLayout from "./main-layout.hbs?raw";
import "./main-layout.scss";

export default (props={}) => {
  return Handlebars.compile(mainLayout)(props);
};

import Handlebars from "handlebars";
import template from "./link.hbs?raw";
import "./link.scss";

interface ILinkProps {
  href?: string;
  value?: string;
  class?: string;
}

export const Link = (props: ILinkProps) => {
  return Handlebars.compile(template)(props);
};

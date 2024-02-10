import Handlebars from "handlebars";
import linkTemplate from "./link.hbs?raw";
import "./link.scss";

interface LinkProps {
  href?: string
  value?: string;
  class?: string
}

export const Link = (props: LinkProps) => {
  return Handlebars.compile(linkTemplate)(props);
};

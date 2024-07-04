import Handlebars from "handlebars";
import template from "./link.hbs?raw";
import "./link.scss";
import { Block } from "../../lib";

interface ILinkProps {
  href?: string;
  value?: string;
  class?: string;
}

export const Link = (props: ILinkProps) => {
  return Handlebars.compile(template)(props);
};

// NEW CLASS METHOD
interface LinkProps extends CompileOptions {
  text: string;
  class?: string;
  href?: string;
  onClick?: (e: Event) => void;
}

export class Linkk extends Block {
  constructor({ onClick, ...props }: LinkProps) {
    super({
      ...props,
      events: {
        click: (e: Event) => onClick && onClick(e),
      },
    });
  }
  render() {
    return this.compile(template, { ...this.props });
  }
}

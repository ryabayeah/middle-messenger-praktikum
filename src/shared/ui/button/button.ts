import Handlebars from "handlebars";
import template from "./button.hbs?raw";
import "./button.scss";
import { Block } from "../../lib";


interface IButtonProps {
  text: string;
  class?: string;
  type?: "submit" | "reset" | "button" | "menu";
  variant?: "primary" | "secondary" | "error" | "link";
  textPosition?: "left" | "center" | "right";
  icon?: string;
  href?: string;
  onClick?: VoidFunction;
}

export const Button = ({
  type = "button",
  variant = "primary",
  textPosition = "center",
  ...props
}: IButtonProps) => {
  return Handlebars.compile(template)({
    type,
    variant,
    textPosition,
    ...props,
  });
};

// NEW CLASS METHOD
export interface ButtonProps extends CompileOptions {
  text: string;
  class?: string;
  type?: "submit" | "reset" | "button" | "menu";
  variant?: "primary" | "secondary" | "error" | "link";
  textPosition?: "left" | "center" | "right";
  icon?: string;
  href?: string;
  onClick?: (e: Event) => void;
}

export class Buttonn extends Block {
  constructor({ onClick, ...props }: ButtonProps) {
    super({
      ...props,
      events: {
        click: (e:Event) => onClick && onClick(e),
      },
    });
  }
  render() {
    return this.compile(template, { ...this.props });
  }
}

import Handlebars from "handlebars";
import template from "./button.hbs?raw";
import "./button.scss";
import { Block } from "../../lib/block";

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
	return Handlebars.compile(template)({ type, variant, textPosition, ...props });
};

interface ButtonProps extends CompileOptions {
  text: string;
  class?: string;
  type?: "submit" | "reset" | "button" | "menu";
  variant?: "primary" | "secondary" | "error" | "link";
  textPosition?: "left" | "center" | "right";
  icon?: string;
  href?: string;
  onClick?: VoidFunction;
}

export class Buttonn extends Block {
  constructor(props: ButtonProps) {
    super({
      ...props,
    });
  }
  render() {
    return this.compile(template, {...this.props});
  }
}
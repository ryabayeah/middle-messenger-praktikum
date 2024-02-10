import Handlebars from "handlebars";
import buttonTemplate from "./button.hbs?raw";
import "./button.scss";

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
  return Handlebars.compile(buttonTemplate)({ type, variant, textPosition, ...props });
};

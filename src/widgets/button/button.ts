import Handlebars from "handlebars";
import buttonTemplate from "./button.hbs?raw";
import "./button.scss";

interface IButtonProps {
  label: string;
  class?: string;
  type?: "submit" | "reset" | "button" | "menu";
  variant?: "primary" | "secondary";
  onClick?: VoidFunction;
}

export const Button = ({
  type = "button",
  variant = "primary",
  ...props
}: IButtonProps) => {
  return Handlebars.compile(buttonTemplate)({ type, variant, ...props });
};

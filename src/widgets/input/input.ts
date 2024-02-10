import Handlebars from "handlebars";
import buttonTemplate from "./input.hbs?raw";
import "./input.scss";

interface IInputProps {
  id: string;
  name: string;
  type?: "text" | "number" | string;
  label?: string;
  value?: string;
  isInvalid?: boolean;
}


export const Input = ({ type = "text", ...props }: IInputProps) => {
  return Handlebars.compile(buttonTemplate)({ type, ...props });
};

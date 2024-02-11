import Handlebars from "handlebars";
import template from "./input.hbs?raw";
import "./input.scss";

interface IInputProps {
  id: string;
  name: string;
  type?: "text" | "number" | string;
  label?: string;
  value?: string;
  isRequired?: boolean;
  isDisabled?: boolean;
  isInvalid?: boolean;
}

export const Input = ({
	type = "text",
	...props
}: IInputProps) => {
	return Handlebars.compile(template)({ type, ...props });
};

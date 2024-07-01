import Handlebars from "handlebars";
import template from "./input.hbs?raw";
import "./input.scss";
import { Block } from "../../lib/block";

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

export const Input = ({ type = "text", ...props }: IInputProps) => {
  return Handlebars.compile(template)({ type, ...props });
};


// NEW CLASS METHOD
interface InputProps extends CompileOptions {
  id: string;
  name: string;
  type?: "text" | "number" | string;
  label?: string;
  value?: string;
  isRequired?: boolean;
  isDisabled?: boolean;
  isInvalid?: boolean;
  onChange?: (e: Event) => void
  onBlur?: (e: Event) => void
}

export class Inputt extends Block {
  constructor({onChange, onBlur, ...props}: InputProps) {
    super({
      ...props,
      events: {
        change: onChange,
        blur: onBlur,
      },
    });
  }
  render() {
    return this.compile(template,  {...this.props});
  }
}

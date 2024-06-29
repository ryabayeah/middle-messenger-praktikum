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

interface InputProps extends CompileOptions {
  id: string;
  name: string;
  type?: "text" | "number" | string;
  label?: string;
  value?: string;
  isRequired?: boolean;
  isDisabled?: boolean;
  isInvalid?: boolean;
  onChange?: (e: string) => void;
  onBlur?: (e: string) => void;
}

export class Inputt extends Block {
  constructor(props: InputProps) {
    super({
      ...props,
    });
  }
  render() {
    return this.compile(template,  {...this.props});
  }
}

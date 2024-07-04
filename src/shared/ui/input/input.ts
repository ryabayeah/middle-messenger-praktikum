import Handlebars from "handlebars";
import template from "./input.hbs?raw";
import template1 from "./input.new.hbs?raw";
import "./input.scss";
import { Block } from "../../lib";

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

export type InputEvents = "blur" | "change";
// TODO: Стоит разделить FileInput и Input
export interface InputProps extends CompileOptions {
  id: string;
  name: string;
  type?: "text" | "number" | string;
  label?: string;
  value?: string;
  class?: string;
  multiple?: boolean;
  accept?: string;
  isRequired?: boolean;
  isDisabled?: boolean;
  isInvalid?: boolean;
  validateOn?: InputEvents[];
  validator?: (value: string) => boolean;
  onChange?: (e: Event) => void;
  onBlur?: (e: Event) => void;
  onValidate?: (isValid: boolean) => void;
}

export class Inputt extends Block {
  constructor({
    validateOn,
    validator,
    onValidate,
    onChange,
    onBlur,
    ...props
  }: InputProps) {
    super({
      ...props,
      events: {
        change: (e: Event) => onChange && onChange(e),
        blur: (e: Event) => {
          if (validateOn?.includes("blur") && validator) {
            const isValid = this.validate(
              validator,
              (e.target as HTMLInputElement).value
            );
            onValidate && onValidate(isValid);
          }
          onBlur && onBlur(e);
        },
      },
    });
  }

  validate(validator: (value: string) => boolean, value: string) {
    const isValid = validator(value);
    this.setProps({
      ...this.props,
      value,
      isInvalid: !isValid,
    });
    return isValid;
  }

  click() {
    this.element?.click();
  }

  render() {
    return this.compile(template1, { ...this.props });
  }
}

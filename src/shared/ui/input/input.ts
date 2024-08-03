import template from './input.hbs?raw';
import './input.scss';
import { Block } from '../../lib';

export type InputEvents = 'blur' | 'change';
export type InputType = 'text' | 'number' | string;
export type InputDefaultValidator = (value: string) => boolean;

// TODO: Стоит разделить FileInput и Input
export interface InputProps extends CompileOptions {
  id: string;
  name: string;
  type?: InputType;
  label?: string;
  value?: string;
  class?: string;
  multiple?: boolean;
  placeholder?: string;
  accept?: string;
  isRequired?: boolean;
  isDisabled?: boolean;
  isInvalid?: boolean;
  validateOn?: InputEvents[];
  validator?: InputDefaultValidator;
  onChange?: (e: Event) => void;
  onBlur?: (e: Event) => void;
  onValidate?: (isValid: boolean) => void;
}

export class Input extends Block {
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
        change: (e: Event) => {
          onChange && onChange(e);
        },
        blur: (e: Event) => {
          if (validateOn?.includes('blur') && validator) {
            const isValid = this.validate(
              validator,
              (e.target as HTMLInputElement).value,
            );       

            onValidate && onValidate(isValid);
          }
          onBlur && onBlur(e);
        },
      },
    });
  }

  get value() {
    return this.props.value;
  }

  validate(validator: InputDefaultValidator, value: string) {
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
    return this.compile(template, { ...this.props });
  }
}

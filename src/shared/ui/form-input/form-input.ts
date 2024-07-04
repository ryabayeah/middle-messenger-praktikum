import template1 from "./form-input.hbs?raw";
import { Inputt } from "../input";
import { InputProps } from "../input/input";
import "./form-input.scss";
import { Feedback } from "../feedback/feedback";
import { Block } from "../../lib";
export type FormInputEvents = "blur" | "change";
// NEW CLASS METHOD
export interface FormInputProps extends InputProps {
  feedbackErrorText?: string;
}

export class FormInput extends Block {
  constructor({
    feedbackErrorText,
    onChange,
    onBlur,
    ...props
  }: FormInputProps) {
    const input = new Inputt({
      ...props,
      onBlur: (e: Event) => {
        onBlur && onBlur(e);
      },
      onValidate: (isValid: boolean) => {
        this.setProps({
          isInvalid: !isValid,
        });
      },
      onChange: onChange,
    });

    const feedbackError = new Feedback({
      value: props.isInvalid && feedbackErrorText ? feedbackErrorText : "",
      class: "form__feedback",
      isInvalid: props.isInvalid,
    });

    super({
      ...props,
      feedbackErrorText,
      input,
      feedbackError,
    });
  }

  componentDidUpdate(
    _oldProps: FormInputProps,
    _newProps: FormInputProps
  ): boolean {
    const { isInvalid, feedbackErrorText, isDisabled } = _newProps;

    if (_oldProps.isInvalid !== isInvalid) {
      const feedbackChild = this.children.feedbackError as Block;
      feedbackChild.setProps({
        class: "form__feedback",
        isInvalid: isInvalid,
        value: isInvalid && feedbackErrorText ? feedbackErrorText : "",
      });
      return true;
    }

    if (_oldProps.isDisabled !== isDisabled) {
      const inputChild = this.children.input as Block;
      inputChild.setProps({
        isDisabled,
      });
      return true;
    }
    if (JSON.stringify(_oldProps) !== JSON.stringify(_newProps)) {
      return true;
    }
    return false;
  }

  render() {
    return this.compile(template1, { ...this.props });
  }
}

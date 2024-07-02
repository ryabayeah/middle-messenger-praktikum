import template1 from "./form-input.hbs?raw";
import { Block } from "../../lib/block";
import { Inputt } from "../input";
import { InputProps } from "../input/input";
import "./form-input.scss";
import { Feedback } from "../feedback/feedback";
export type FormInputEvents = "blur" | "change";
// NEW CLASS METHOD
export interface FormInputProps extends InputProps {
  feedbackText?: string;
}

export class FormInput extends Block {
  constructor({ feedbackText, onChange, onBlur, ...props }: FormInputProps) {
    const input = new Inputt({
      ...props,
      onBlur: (e: Event) => {
        onBlur && onBlur(e);
      },
      onValidate: (isValid: boolean) => {
        this.setProps({
          ...props,
          isInvalid: !isValid,
        });
        // console.log(this.props.isInvalid !== isInvalid, "----");

        // if (this.props.isInvalid !== isInvalid) {
        //   this.setProps({
        //     ...props,
        //     isInvalid,
        //   });

        //   // const feedbackChild = this.children.feedbackError as Block
        //   // feedbackChild.setProps({
        //   //   class: "form__feedback",
        //   //   isInvalid,
        //   //   value: isInvalid && feedbackText? feedbackText : ''
        //   // })
        // }
      },
      onChange: onChange,
    });

    const feedbackError = new Feedback({
      value: props.isInvalid && feedbackText ? feedbackText : "",
      class: "form__feedback",
      isInvalid: props.isInvalid,
    });

    super({
      ...props,
      feedbackText,
      input,
      feedbackError,
    });
  }

  componentDidUpdate(
    _oldProps: FormInputProps,
    _newProps: FormInputProps
  ): boolean {
    const feedbackChild = this.children.feedbackError as Block;
    const { isInvalid, feedbackText } = _newProps;
    feedbackChild.setProps({
      class: "form__feedback",
      isInvalid: isInvalid,
      value: isInvalid && feedbackText ? feedbackText : "",
    });
    return true;
  }

  render() {
    // console.log(this.props.isInvalid, '_-1')
    return this.compile(template1, { ...this.props });
  }
}

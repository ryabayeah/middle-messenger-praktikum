import template1 from './form-input.hbs?raw';
import { Input } from '../input';
import { InputProps } from '../input/input';
import './form-input.scss';
import { Feedback } from '../feedback/feedback';
import { Block } from '../../lib';

export interface FormInputProps extends InputProps {
  class?: string;
  feedbackErrorText?: string;
}

export class FormInput extends Block {
  constructor({
    feedbackErrorText,
    onChange= () => {},
    onBlur,
    ...props
  }: FormInputProps) {
    const input = new Input({
      ...props,
      onBlur: (e: Event) => {
        onBlur && onBlur(e);
      },
      onValidate: (isValid: boolean) => {
        this.setProps({
          isInvalid: !isValid,
        });
      },
      onChange: (e: Event) => {
        // const value = (e.target as HTMLInputElement).value || ''
        // console.log(value, "---")
        // this.setProps({value})
        onChange(e)
      },
    });

    const feedbackError = new Feedback({
      value: props.isInvalid && feedbackErrorText ? feedbackErrorText : '',
      class: 'form__feedback',
      isInvalid: props.isInvalid,
    });

    super({
      ...props,
      feedbackErrorText,
      input,
      feedbackError,
    });
  }

  get inputValue(): string {
    return String((this.children.input as Input).value);
  }

  componentDidUpdate(
    _oldProps: FormInputProps,
    _newProps: FormInputProps,
  ): boolean {
    const { isInvalid, feedbackErrorText, isDisabled, value } = _newProps;
    const inputChild = this.children.input as Input;
    const feedbackChild = this.children.feedbackError as Feedback;

    if (_oldProps.isInvalid !== isInvalid) {
      feedbackChild.setProps({
        class: 'form__feedback',
        isInvalid: isInvalid,
        value: isInvalid && feedbackErrorText ? feedbackErrorText : '',
      });
    }

    if (_oldProps.isDisabled !== isDisabled) {
      inputChild.setProps({
        isDisabled,
      });
    }


    if (_oldProps.value !== value) {
      inputChild.setProps({
        value,
      });
    }

    return true;
  }

  setValue(value: string){
    const inputChild = this.children.input as Input;
    inputChild.setProps({
      value,
    });
  }
  render() {
    return this.compile(template1, { ...this.props });
  }
}

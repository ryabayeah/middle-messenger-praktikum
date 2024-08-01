import template from './button.hbs?raw';
import './button.scss';
import { Block } from '../../lib';

export type ButtonType = 'submit' | 'reset' | 'button' | 'menu';
export type ButtonVariant = 'primary' | 'secondary' | 'error' | 'link';
export type ButtonTextPosition = 'left' | 'center' | 'right';

export interface ButtonProps extends CompileOptions {
  text: string;
  class?: string;
  type?: ButtonType;
  variant?: ButtonVariant;
  textPosition?: ButtonTextPosition;
  icon?: string;
  href?: string;
  onClick?: (e: Event) => void;
}

export class Button extends Block {
  constructor({ onClick=()=>{}, ...props }: ButtonProps) {
    super({
      ...props,
      events: {
        click: (e: Event) => {
          onClick(e)},
      },
    });
  }
  render() {
    return this.compile(template, { ...this.props });
  }
}

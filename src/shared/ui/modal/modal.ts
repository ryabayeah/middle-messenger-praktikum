import template from './modal.hbs?raw';
import './modal.scss';
import { Block } from '../../lib';

export interface ModalProps extends CompileOptions {
  title: string;
  body?: Block;
  buttons: Block[];
  hide?: boolean;
  isInvalid?: boolean;
  class?: string;
  onSubmit?: (e: Event) => void
}

export class Modal extends Block {
  constructor({ onSubmit = () => {}, ...props }: ModalProps) {
    super({
      ...props,
      events: {
        submit: (e: Event) => {
          e.preventDefault()
          onSubmit(e)
      }}
    });
  }
  render() {
    return this.compile(template, { ...this.props });
  }
}

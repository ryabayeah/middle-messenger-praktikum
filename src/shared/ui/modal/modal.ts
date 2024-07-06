import template from "./modal.hbs?raw";
import "./modal.scss";
import { Block } from "../../lib";

export interface ModalProps extends CompileOptions {
  title: string;
  body?: Block;
  buttons: Block[];
  hide?: boolean;
  isInvalid?: boolean;
  class?: string;
}

export class Modal extends Block {
  constructor({ ...props }: ModalProps) {
    super({
      ...props,
    });
  }
  render() {
    return this.compile(template, { ...this.props });
  }
}

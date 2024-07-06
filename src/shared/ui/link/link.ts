import template from './link.hbs?raw';
import './link.scss';
import { Block } from '../../lib';

interface LinkProps extends CompileOptions {
  text: string;
  class?: string;
  href?: string;
  onClick?: (e: Event) => void;
}

export class Link extends Block {
  constructor({ onClick, ...props }: LinkProps) {
    super({
      ...props,
      events: {
        click: (e: Event) => onClick && onClick(e),
      },
    });
  }
  render() {
    return this.compile(template, { ...this.props });
  }
}

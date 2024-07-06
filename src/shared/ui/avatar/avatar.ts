import template from './avatar.hbs?raw';
import './avatar.scss';
import { Block } from '../../lib';

interface AvatarProps extends CompileOptions {
  src?: string;
  class?: string;
  isEditable?: boolean;
  onClick?: (e: Event) => void;
}

export class Avatar extends Block {
  constructor({ onClick, ...props }: AvatarProps) {
    super({
      ...props,
      events: {
        click: (e: Event) => {
          onClick && onClick(e);
        },
      },
    });
  }
  render() {
    return this.compile(template, { ...this.props });
  }
}

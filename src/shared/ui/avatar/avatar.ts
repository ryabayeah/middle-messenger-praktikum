import template from './avatar.hbs?raw';
import './avatar.scss';
import { Block } from '../../lib';
import { getResource } from '../../utils';

interface AvatarProps extends CompileOptions {
  srcPath?: string;
  class?: string;
  isEditable?: boolean;
  onClick?: (e: Event) => void;
}

export class Avatar extends Block {
  constructor({ srcPath, isEditable=false, onClick = () => {}, ...props }: AvatarProps) {
    super({
      ...props,
      src: getResource(srcPath),
      isEditable,
      events: {
        click: (e: Event) => {
          isEditable && onClick(e);
        },
      },
    });
  }
  render() {
    console.log(this.props.src, "-")
    return this.compile(template, { ...this.props });
  }
}

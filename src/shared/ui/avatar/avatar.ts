import template from './avatar.hbs?raw';
import './avatar.scss';
import { Block } from '../../lib';
import { RESOURCES_URL } from '../../api';

interface AvatarProps extends CompileOptions {
  srcPath?: string;
  class?: string;
  onClick?: (e: Event) => void;
}

const DEFAULT_AVATAR_SRC =
  'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/340px-Default_pfp.svg.png';

export class Avatar extends Block {
  constructor({
    srcPath,
    onClick = () => {},
    ...props
  }: AvatarProps) {
    let src = DEFAULT_AVATAR_SRC
    console.log(srcPath, "--")
    if (srcPath){
      src = `${RESOURCES_URL}${srcPath}`
    }
    super({
      ...props,
      src,
      events: {
        click: onClick,
      },
    });
  }
  render() {
    return this.compile(template, { ...this.props });
  }
}

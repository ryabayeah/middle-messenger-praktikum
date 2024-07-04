import Handlebars from "handlebars";
import template from "./avatar.hbs?raw";
import "./avatar.scss";
import { Block } from "../../lib";

interface IAvatarProps {
  src?: string;
  class?: string;
  isEditable?: boolean;
}

export const Avatar = ({ isEditable = false, ...props }: IAvatarProps) => {
  return Handlebars.compile(template)({ isEditable, ...props });
};

// NEW CLASS METHOD
interface AvatarProps extends CompileOptions {
  src?: string;
  class?: string;
  isEditable?: boolean;
  onClick: (e: Event) => void;
}

export class Avatarr extends Block {
  constructor({ onClick, ...props }: AvatarProps) {
    super({
      ...props,
      events: {
        click: onClick,
      },
    });
  }
  render() {
    return this.compile(template, { ...this.props });
  }
}

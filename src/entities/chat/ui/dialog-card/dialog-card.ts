import "./dialog-card.scss";
import template from "./dialog-card.hbs?raw";
import { Block } from "../../../../shared/lib";
import { Avatar } from "../../../../shared/ui";

interface DialogCardProps extends CompileOptions {
  id: number
  avatarSrc: string;
  name: string;
  isActive?: boolean
  isLastMe?: boolean;
  lastMessage: string;
  lastMessageTime: string;
  messageCount?: number;
  onClick: (id?: number) => void
}

export class DialogCard extends Block {
  constructor({ avatarSrc, onClick, ...props }: DialogCardProps) {
    const userAvatar = new Avatar({
      src: avatarSrc,
      class: "dialog-card__avatar",
    });
    super({
      userAvatar,
      ...props,
      events: {
        click: () => onClick(props.isActive? undefined : props.id)
      }
    });
  }
  render() {
    return this.compile(template, { ...this.props });
  }
}

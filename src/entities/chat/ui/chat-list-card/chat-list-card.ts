import './chat-list-card.scss';
import template from './chat-list-card.hbs?raw';
import { Block } from '../../../../shared/lib';
import { Avatar } from '../../../../shared/ui';

interface ChatListCardProps extends CompileOptions {
  id: number;
  avatar: string;
  title: string;
  isActive?: boolean;
  isLastMe?: boolean;
  lastMessageName?: string
  lastMessage?: string;
  lastMessageTime?: string;
  unread_count: number;
  onClick: (id?: number) => void;
}

export class ChatListCard extends Block {
  constructor({ avatar, onClick, ...props }: ChatListCardProps) {
    const userAvatar = new Avatar({
      srcPath: avatar,
      class: 'dialog-card__avatar',
    });
    super({
      userAvatar,
      ...props,
      events: {
        click: () => onClick(props.isActive ? undefined : props.id),
      },
    });
  }
  render() {
    return this.compile(template, { ...this.props });
  }
}

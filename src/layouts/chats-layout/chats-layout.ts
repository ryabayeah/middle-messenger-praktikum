import { Dialog } from '../../entities/chat/lib';
import { Chat, ChatList } from '../../entities/chat/ui';
import { withStore } from '../../shared/hoc';
import { Block } from '../../shared/lib';
import template from './chats-layout.hbs?raw';
import './chats-layout.scss';

interface ChatsLayoutProps extends CompileOptions {
  searchQuery?: string;
  dialogs?: Dialog[];
  selectedDialog?: number;
}

const withChats = withStore(({ selectedDialog, dialogs }) => {
  return {
    selectedDialog: selectedDialog ? { ...selectedDialog } : undefined,
    dialogs: [...(dialogs || [])],
  };
});
const withSelectedChat = withStore(({ selectedDialog, dialogUsers }) => {
  return {
     ...selectedDialog,
     dialogUsers: {...dialogUsers}
  };
});

export class ChatsLayout extends Block {
  constructor({ dialogs = [], ...props }: ChatsLayoutProps) {
    const ChatListConnected = withChats(ChatList as typeof Block);
    const sidebar = new ChatListConnected({
      dialogs,
    });

    const ChatConnected = withSelectedChat(Chat as typeof Block);
    const body = new ChatConnected({});

    super({
      ...props,
      searchQuery: '',
      dialogs,

      sidebar,
      body,
    });
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}

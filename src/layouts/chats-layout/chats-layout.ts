import { chatController } from '../../entities/chat/controller';
import { Dialog } from '../../entities/chat/lib';
import { Chat, ChatList } from '../../entities/chat/ui';
import { withStore } from '../../shared/hoc';
import { Block } from '../../shared/lib';
import template from './chats-layout.hbs?raw';
import './chats-layout.scss';

interface ChatsLayoutProps extends CompileOptions {
  searchQuery?: string;
  dialogs?: Dialog[];
  selectedDialogId?: number;
}

const withDialogs = withStore((state) => {
  return { dialogs: [...(state.dialogs || [])] };
});
const withSelectedDialog = withStore((state) => {
  return { ...state.selectedDialog };
});

export class ChatsLayout extends Block {
  constructor({ dialogs, selectedDialogId, ...props }: ChatsLayoutProps) {
    const ChatListConnected = withDialogs(ChatList as typeof Block);
    const sidebar = new ChatListConnected({
      dialogs: [],
      onSelectDialog: (selectedDialog?: Dialog) =>
        chatController.selectChat(selectedDialog),
    });

    const ChatConnected = withSelectedDialog(Chat as typeof Block);
    const body = new ChatConnected({});

    super({
      ...props,
      searchQuery: '',
      selectedDialogId,
      dialogs,

      sidebar,
      body,
    });
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}

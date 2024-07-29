import { chatController } from '../../entities/chat/controller';
import {
  DIALOG_MESSAGE,
  Dialog,
} from '../../entities/chat/lib';
import {
  Chat,
  ChatErrorLayout,
  ChatList,
} from '../../entities/chat/ui';
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
  constructor({
    dialogs,
    selectedDialogId,
    ...props
  }: ChatsLayoutProps) {
    const ChatListConnected = withDialogs(
      ChatList as typeof Block,
    );
    const sidebar = new ChatListConnected({
      dialogs: [],
      onSelectDialog: (selectedDialog?: Dialog) =>
        this.handleSelectDialog(selectedDialog),
    });

    const body = new ChatErrorLayout({
      message: DIALOG_MESSAGE.NO_DIALOG_SELECTED,
    });

    super({
      ...props,
      searchQuery: '',
      selectedDialogId,
      dialogs,

      sidebar,
      body,
    });
  }

  handleSelectDialog(selectedDialog?: Dialog) {
    chatController.selectChat(selectedDialog);
    let body = new ChatErrorLayout({
      message: DIALOG_MESSAGE.NO_DIALOG_SELECTED,
    });
    if (selectedDialog) {
      chatController.connectToChat(selectedDialog?.id)

      const ChatConnected = withSelectedDialog(Chat as typeof Block);
      body = new ChatConnected({
        id: selectedDialog.id,
        title: selectedDialog.title,
        avatar: selectedDialog.avatar,
      });
    }

    this.setChildren({ body });
  }
  renderNoDataMessage() {
    return new ChatErrorLayout({
      message: DIALOG_MESSAGE.NO_DIALOG_SELECTED,
    });
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}

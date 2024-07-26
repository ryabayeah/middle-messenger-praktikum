import { chatController } from '../../entities/chat/controller';
import {
  DIALOG_CARDS,
  DIALOG_MESSAGE,
  ChatDialogShort,
  Dialog,
} from '../../entities/chat/lib';
import {
  Chat,
  DialogNoLayout,
  DialogsListSidebar,
} from '../../entities/chat/ui';
import { withStore } from '../../shared/hoc';
import { Block } from '../../shared/lib';
import template from './chats-layout.hbs?raw';
import './chats-layout.scss';

interface ChatsLayoutProps extends CompileOptions {
  searchQuery?: string;
  dialogs?: ChatDialogShort[];
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
    dialogs = DIALOG_CARDS,
    selectedDialogId,
    ...props
  }: ChatsLayoutProps) {
    const DialogsListSidebarConnected = withDialogs(
      DialogsListSidebar as typeof Block,
    );
    const sidebar = new DialogsListSidebarConnected({
      dialogs: [],
      onSelectDialog: (selectedDialog?: Dialog) =>
        this.handleSelectDialog(selectedDialog),
    });

    const body = new DialogNoLayout({
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
    let body = new DialogNoLayout({
      message: DIALOG_MESSAGE.NO_DIALOG_SELECTED,
    });
    if (selectedDialog) {
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
    return new DialogNoLayout({
      message: DIALOG_MESSAGE.NO_DIALOG_SELECTED,
    });
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}

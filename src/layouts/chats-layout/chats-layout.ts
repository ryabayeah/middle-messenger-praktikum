import {
  DIALOG_CARDS,
  DIALOG_MESSAGE,
  ChatDialogShort,
} from '../../entities/chat/lib';
import {
  Dialog,
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


const withDialogs = withStore(state => {
  return { dialogs: [...(state.dialogs || [])] }
});
// TODO: Подумать над уровнями доступа методов
export class ChatsLayout extends Block {
  constructor({
    dialogs = DIALOG_CARDS,
    selectedDialogId,
    ...props
  }: ChatsLayoutProps) {
    const DialogsListSidebarConnected = withDialogs(DialogsListSidebar as typeof Block)
    const sidebar = new DialogsListSidebarConnected({
      dialogs: [],
      onSelectDialog: () => {},
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

  renderNoDataMessage() {
    return new DialogNoLayout({
      message: DIALOG_MESSAGE.NO_DIALOG_SELECTED,
    });
  }

  renderBody(id?: number) {
    let body;
    if (id) {
      const dialogs = this.props.dialogs as ChatDialogShort[];
      const shortDialog = dialogs.find((d) => d.id === id);
      if (shortDialog) {
        body = new Dialog({
          id,
          title: shortDialog.title,
          avatar: shortDialog.avatar,
        });
      }
    } else {
      body = new DialogNoLayout({
        message: DIALOG_MESSAGE.NO_DIALOG_SELECTED,
      });
    }

    this.setChildren({ body });
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}

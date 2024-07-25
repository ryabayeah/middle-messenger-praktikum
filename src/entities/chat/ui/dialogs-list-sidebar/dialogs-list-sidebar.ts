import template from './dialogs-list-sidebar.hbs?raw';
import './dialogs-list-sidebar.scss';
import { Block } from '../../../../shared/lib';
import { ChatDialogShort, Dialog } from '../../lib';
import { APP_PATH } from '../../../../shared/constants';
import { DialogCard } from '../dialog-card';
import { DialogSearch } from '../dialog-search';
import { Button, Link } from '../../../../shared/ui';
import { NoDialogsMessage } from '../no-dialogs-message';

interface DialogsListSidebarProps extends CompileOptions {
  dialogs?: Dialog[];
  selectedDialogId?: number;
  onSelectDialog?: (id?: number) => void;
}

export class DialogsListSidebar extends Block {
  constructor({ dialogs = [], onSelectDialog = () => {} }) {
    const linkProfile = new Link({
      text: 'Профиль  >',
      href: APP_PATH.PROFILE,
      class: 'text-secondary ',
    });

    const dialogSearch = new DialogSearch({
      onChange: (value: string) => this.handleDialogCardSearch(value),
    });

    const createButton = new Button({
      text: 'Создать диалог',
      class: 'create-dialog-btn',
      variant: 'secondary'
    });

    super({
      dialogs,
      linkProfile,
      createButton, 
      searchInput: dialogSearch,
      sidebarBody: new NoDialogsMessage(),
      onSelectDialog,
    });
  }

  // TODO: Здесь будет API запрос с search (?), вместо фильтрации "руками"
  getFilteredChatDialogs(title: string) {
    return (this.props.dialogs as ChatDialogShort[]).filter((dialog) =>
      dialog.title.includes(title),
    );
  }

  handleDialogCardSearch(value: string) {
    const filteredDialogs = this.getFilteredChatDialogs(value);
    this.setProps({ searchQuery: value, dialogs: filteredDialogs });
    this.renderDialogCards(
      filteredDialogs,
      this.props.selectedDialogId as number | undefined,
    );
  }

  handleDialogCardClick(id?: number) {
    this.setProps({ selectedDialogId: id });
    // TODO: Указать в URL ID выбранного чата
    this.getChats(this.props as DialogsListSidebarProps);
    // this.renderBody(id);
  }

  renderDialogCards(dialogs: ChatDialogShort[], activeId: number | undefined) {
    this.setChildren({
      sidebarBody: dialogs.map(
        ({ id, avatar, title, last_message, unread_count }) =>
          new DialogCard({
            id,
            avatar,
            title,
            isLastMe: false,
            lastMessageName: last_message?.user.first_name,
            lastMessage: last_message?.content,
            lastMessageTime: last_message?.time,
            unread_count,
            isActive: id === activeId,
            onClick: (id?: number) => this.handleDialogCardClick(id),
          }),
      ),
    });
  }

  getChats(newProps: DialogsListSidebarProps) {
    const { dialogs } = newProps;
    if (!dialogs || dialogs.length === 0) {
      return new NoDialogsMessage();
    }

    return (dialogs || []).map(
      ({ id, avatar, title, last_message, unread_count }) =>
        new DialogCard({
          id,
          avatar,
          title,
          isLastMe: false,
          lastMessageName: last_message?.user.first_name,
          lastMessage: last_message?.content,
          lastMessageTime: last_message?.time,
          unread_count,

          isActive: id === this.props.selectedDialogId,
          onClick: this.handleDialogCardClick,
        }),
    );
  }


  componentDidUpdate(
    oldProps: DialogsListSidebarProps,
    newProps: DialogsListSidebarProps,
  ): boolean {
    if (JSON.stringify(oldProps.dialogs) !== JSON.stringify(newProps.dialogs)) {
      this.setChildren({ sidebarBody: this.getChats(newProps) });
    }
    return true;
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}

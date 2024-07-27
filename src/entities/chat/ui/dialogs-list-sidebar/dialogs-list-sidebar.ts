import template from './dialogs-list-sidebar.hbs?raw';
import './dialogs-list-sidebar.scss';
import { Block } from '../../../../shared/lib';
import { ChatDialogShort, Dialog } from '../../lib';
import { APP_PATH } from '../../../../shared/constants';
import { DialogCard } from '../dialog-card';
import { DialogSearch } from '../dialog-search';
import { Button, Input, Link } from '../../../../shared/ui';
import { NoDialogsMessage } from '../no-dialogs-message';
import { DialogCreateModal } from '../dialog-create-modal';
import { chatController } from '../../controller';
import { store } from '../../../../shared/store/store';

interface DialogsListSidebarProps extends CompileOptions {
  dialogs?: Dialog[];
  selectedDialogId?: number;
  onSelectDialog?: (selectedDialog?: Dialog) => void;
}
interface DialogsListSidebarChildren extends CompileOptions {
  linkProfile: Link;
  createButton: Button;
  searchInput: Input;
  sidebarBody: NoDialogsMessage;
  createDialogModal: DialogCreateModal;
}

// TODO: Сделать isLoading загрузки данных
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
      variant: 'secondary',
      onClick: () => {
        this.__openCreateDialog();
      },
    });

    const createDialogModal = new DialogCreateModal({
      onApply: () => this.handleCreateApply(),
      onClose: () => this.__closeCreateDialog(),
    });
    createDialogModal.hide();

    const components: DialogsListSidebarChildren = {
      linkProfile,
      createButton,
      searchInput: dialogSearch,
      sidebarBody: new NoDialogsMessage(),
      createDialogModal,
    };

    const props: DialogsListSidebarProps = {
      dialogs,
      selectedDialogId: undefined,
      onSelectDialog,
    };

    super({
      ...components,
      ...props,
    });
  }

  componentDidUpdate(
    oldProps: DialogsListSidebarProps,
    newProps: DialogsListSidebarProps,
  ): boolean {
    const isDialogsEqual = JSON.stringify(oldProps.dialogs) === JSON.stringify(newProps.dialogs)
    const isSelectedDialogIdEqual = oldProps.selectedDialogId === newProps.selectedDialogId
    if (!isDialogsEqual || !isSelectedDialogIdEqual) {
      this.setChildren({ sidebarBody: this.renderDialogs({...newProps}) });
    }
    return true;
  }

  private __closeCreateDialog() {
    const createDialogModal = this.children
      .createDialogModal as DialogCreateModal;
    createDialogModal.hide();
  }

  private __openCreateDialog() {
    const createDialogModal = this.children
      .createDialogModal as DialogCreateModal;
    createDialogModal.show();
  }

  handleCreateApply() {
    chatController.getChats();
    this.__closeCreateDialog();
  }
  handleDialogCardSearch(value: string) {
    chatController.getChats({ title: value });
  }
  handleDialogCardClick(dialog?: Dialog) {
    const { onSelectDialog } = this.props as DialogsListSidebarProps;
    if (onSelectDialog) {
      onSelectDialog(dialog);
    }
    this.setProps({selectedDialogId: dialog?.id})
  }

  renderDialogs(props: DialogsListSidebarProps) {
    const { dialogs, selectedDialogId } = props;
    const {user} = store.getState()
    if (!dialogs || dialogs.length === 0) {
      return new NoDialogsMessage();
    }

    return ([...dialogs] || []).map(
      (dialog) =>{
        const {id, avatar, title, last_message, unread_count} = dialog
        let isLastMe, lastMessageTime;
        if (last_message){
          isLastMe = user?.login === last_message?.user.login;

          // Если сегодняшний день, то время (14: 54)
          // Если в диапазоне трех дней, то день недели (Пт)
          // Иначе дату (27 июля)
          const date = new Date(last_message.time)
          lastMessageTime = `${date.getHours()}:${date.getMinutes()}`
        }
        return new DialogCard({
          id,
          avatar,
          title,
          isLastMe,
          lastMessageName: last_message?.user.first_name,
          lastMessage: last_message?.content,
          lastMessageTime,
          unread_count: unread_count,

          isActive: dialog.id === selectedDialogId,
          onClick: () => this.handleDialogCardClick(dialog),
        })
      }
    );
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}

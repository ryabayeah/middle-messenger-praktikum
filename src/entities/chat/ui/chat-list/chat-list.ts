import template from './chat-list.hbs?raw';
import './chat-list.scss';
import { Block } from '../../../../shared/lib';
import { Dialog } from '../../lib';
import { APP_PATH } from '../../../../shared/constants';
import { ChatListCard } from '../chat-list-card';
import { ChatSearchInput } from '../chat-search-input';
import { Button, Input, Link } from '../../../../shared/ui';
import { NoChatsMessage } from '../no-chats-message';
import { ChatCreateModal } from '../chat-create-modal';
import { chatController } from '../../controller';
import { store } from '../../../../shared/lib/store';
import { getMessageTime } from '../../lib/utils';

interface ChatListProps extends CompileOptions {
  dialogs?: Dialog[];
  selectedDialog?: Dialog;
}
interface ChatListChildren extends CompileOptions {
  linkProfile: Link;
  createButton: Button;
  searchInput: Input;
  sidebarBody: NoChatsMessage;
  createDialogModal: ChatCreateModal;
}

// TODO: Сделать isLoading загрузки данных
export class ChatList extends Block {
  constructor({ dialogs = [], selectedDialog=undefined}: ChatListProps) {
    const linkProfile = new Link({
      text: 'Профиль  >',
      href: APP_PATH.PROFILE,
      class: 'text-secondary ',
    });

    const dialogSearch = new ChatSearchInput({
      onChange: (value: string) => this.handleChatListCardSearch(value),
    });

    const createButton = new Button({
      text: 'Создать диалог',
      class: 'create-dialog-btn',
      variant: 'secondary',
      onClick: () => {
        this.__openCreateDialog();
      },
    });

    const createDialogModal = new ChatCreateModal({
      onApply: () => this.handleCreateApply(),
      onClose: () => this.__closeCreateDialog(),
    });
    createDialogModal.hide();

    const components: ChatListChildren = {
      linkProfile,
      createButton,
      searchInput: dialogSearch,
      sidebarBody: new NoChatsMessage(),
      createDialogModal,
    };

    const props: ChatListProps = {
      dialogs,
      selectedDialog,
    };

    super({
      ...components,
      ...props,
    });
  }

  componentDidUpdate(
    oldProps: ChatListProps,
    newProps: ChatListProps,
  ): boolean {
    const isDialogsEqual = JSON.stringify(oldProps.dialogs) === JSON.stringify(newProps.dialogs)
    const isSelectedDialogIdEqual = oldProps.selectedDialog?.id === newProps.selectedDialog?.id
    if (!isDialogsEqual || !isSelectedDialogIdEqual) {
      this.setChildren({ sidebarBody: this.renderDialogs({...newProps}) });
    }
    return true;
  }

  private __closeCreateDialog() {
    const createDialogModal = this.children
      .createDialogModal as ChatCreateModal;
    createDialogModal.hide();
  }

  private __openCreateDialog() {
    const createDialogModal = this.children
      .createDialogModal as ChatCreateModal;
    createDialogModal.show();
  }

  handleCreateApply() {
    this.__closeCreateDialog();
  }

  handleChatListCardSearch(value: string) {
    chatController.getChats({ title: value });
  }

  handleChatListCardClick(dialog?: Dialog) {
    chatController.selectChat(dialog)
  }

  renderDialogs(props: ChatListProps) {
    const { dialogs, selectedDialog } = props;
    const {user} = store.getState()
    if (!dialogs || dialogs.length === 0) {
      return new NoChatsMessage();
    }

    return dialogs.map(
      (dialog) =>{
        const {id, avatar, title, last_message, unread_count} = dialog
        let isLastMe, lastMessageTime;
        if (last_message){
          isLastMe = user?.login === last_message?.user.login;
          lastMessageTime = getMessageTime(last_message.time)
          
          const date = new Date(last_message.time)
          const currentDate = new Date()
          if (date.getTime() === currentDate.getTime()){
              lastMessageTime = `${date.getHours()}:${date.getMinutes() < 10? `0${date.getMinutes()}` : date.getMinutes()}`
          }
          
        }
        return new ChatListCard({
          id,
          avatar,
          title,
          isLastMe,
          lastMessageName: last_message?.user.first_name,
          lastMessage: last_message?.content,
          lastMessageTime,
          unread_count: unread_count,

          isActive: dialog.id === selectedDialog?.id,
          onClick: () => this.handleChatListCardClick(dialog.id === selectedDialog?.id?undefined :dialog),
        })
      }
    );
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}

import './chat-actions.scss';
import template from './chat-actions.hbs?raw';
import { Block } from '../../../../shared/lib';
import { Button } from '../../../../shared/ui';
import { DIALOG_ICONS } from '../../lib/constants';
import { chatController } from '../../controller';
import { ChatDeleteUserModal } from '../chat-delete-user-modal';
import { ChatDeleteModal } from '../chat-delete-modal';

interface ChatActionsProps extends CompileOptions {
  chatId: number
  onUserAdd: (e: Event) => void;
  onUserDelete: (e: Event) => void;
}

// TODO: Сделать общим компонентом с DialogAttachments
export class ChatActions extends Block {
  constructor({ chatId, onUserAdd, onUserDelete }: ChatActionsProps) {
    const buttonAddUser = new Button({
      text: 'Добавить пользователя',
      variant: 'secondary',
      icon: DIALOG_ICONS.ADD,
      onClick: onUserAdd,
    });
    const buttonDeleteUser = new Button({
      text: 'Удалить пользователя',
      variant: 'secondary',
      icon: DIALOG_ICONS.DELETE,
      onClick: onUserDelete,
    });
    const buttonDeleteDialog = new Button({
      text: 'Удалить диалог',
      variant: 'secondary',
      icon: DIALOG_ICONS.DELETE,
      onClick: ()=>this.__openDeleteDialog(),
    });

    const deleteChatModal = new ChatDeleteModal({
      chatId,
      onApply: () => this.__closeDeleteDialog(),
      onClose: () => this.__closeDeleteDialog(),
    });
    deleteChatModal.hide();
  
    super({
      buttonAddUser,
      buttonDeleteUser,
      buttonDeleteDialog,

      deleteChatModal,
    });
  }

  
  private __openDeleteDialog() {
    const deleteChatModal = this.children
      .deleteChatModal as ChatDeleteUserModal;
      deleteChatModal.show();
  }

  private __closeDeleteDialog() {
    const deleteChatModal = this.children
      .deleteChatModal as ChatDeleteUserModal;
      deleteChatModal.hide();
  }

  toggleVisibility() {
    this.element?.style.display === 'none' ? this.show() : this.hide();
  }
  render() {
    return this.compile(template, { ...this.props });
  }
}

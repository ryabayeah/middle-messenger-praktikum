import './chat-actions.scss';
import template from './chat-actions.hbs?raw';
import { Block } from '../../../../shared/lib';
import { Button } from '../../../../shared/ui';
import { DIALOG_ICONS } from '../../lib/constants';
import { ChatDeleteUserModal } from '../chat-delete-user-modal';
import { ChatDeleteModal } from '../chat-delete-modal';
import { ChatAddUserModal } from '../chat-add-user-modal';

export class ChatActions extends Block {
  constructor() {
    const buttonAddUser = new Button({
      text: 'Добавить пользователя',
      variant: 'secondary',
      icon: DIALOG_ICONS.ADD,
      onClick: () => this.__openAddUser(),
    });
    const buttonDeleteUser = new Button({
      text: 'Удалить пользователя',
      variant: 'secondary',
      icon: DIALOG_ICONS.DELETE,
      onClick: () => this.__openDeleteUser(),
    });
    const buttonDeleteDialog = new Button({
      text: 'Удалить диалог',
      variant: 'secondary',
      icon: DIALOG_ICONS.DELETE,
      onClick: () => this.__openDelete(),
    });

    const deleteChatModal = new ChatDeleteModal({
      onApply: () => this.__closeDelete(),
      onClose: () => this.__closeDelete(),
    });
    deleteChatModal.hide();

    const addUserModal = new ChatAddUserModal({
      onApply: () => this.__closeAddUser(),
      onClose: () => this.__closeAddUser(),
    });
    addUserModal.hide();

    const deleteUserModal = new ChatDeleteUserModal({
      onApply: () => this.__closeDeleteUser(),
      onClose: () => this.__closeDeleteUser(),
    });
    deleteUserModal.hide();

    super({
      buttonAddUser,
      buttonDeleteUser,
      buttonDeleteDialog,

      deleteChatModal,
      addUserModal,
      deleteUserModal,
    });
  }

  private __openAddUser() {
    const addUserModal = this.children.addUserModal as ChatAddUserModal;
    addUserModal.show();
  }

  private __closeAddUser() {
    const addUserModal = this.children.addUserModal as ChatAddUserModal;
    addUserModal.hide();
  }

  private __closeDeleteUser() {
    const deleteUserModal = this.children
      .deleteUserModal as ChatDeleteUserModal;
    deleteUserModal.hide();
  }

  private __openDeleteUser() {
    const deleteUserModal = this.children
      .deleteUserModal as ChatDeleteUserModal;
    deleteUserModal.show();
  }

  private __openDelete() {
    const deleteChatModal = this.children
      .deleteChatModal as ChatDeleteUserModal;
    deleteChatModal.show();
  }

  private __closeDelete() {
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

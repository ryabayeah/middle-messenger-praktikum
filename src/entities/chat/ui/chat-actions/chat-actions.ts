import './chat-actions.scss';
import template from './chat-actions.hbs?raw';
import { Block } from '../../../../shared/lib';
import { Button } from '../../../../shared/ui';
import { DIALOG_ICONS } from '../../lib/constants';
import { ChatDeleteUserModal } from '../chat-delete-user-modal';
import { ChatDeleteModal } from '../chat-delete-modal';
import { ChatAddUserModal } from '../chat-add-user-modal';
import { ChatChangeAvatarModal } from '../chat-change-avatar-modal';

export class ChatActions extends Block {
  constructor() {
    const buttonChangeAvatar = new Button({
      text: 'Изменить аватар чата',
      variant: 'secondary',
      // icon: DIALOG_ICONS.ACTION,
      onClick: () => this.__openChangeAvatar(),
    });
    const buttonAddUser = new Button({
      text: 'Добавить пользователя',
      variant: 'secondary',
      // icon: DIALOG_ICONS.ADD,
      onClick: () => this.__openAddUser(),
    });
    const buttonDeleteUser = new Button({
      text: 'Удалить пользователя',
      variant: 'secondary',
      // icon: DIALOG_ICONS.DELETE,
      onClick: () => this.__openDeleteUser(),
    });
    const buttonDeleteDialog = new Button({
      text: 'Удалить диалог',
      variant: 'secondary',
      // icon: DIALOG_ICONS.DELETE,
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


    const changeAvatarModal = new ChatChangeAvatarModal({
      onApply: () => this.__closeChangeAvatar(),
      onClose: () => this.__closeChangeAvatar(),
    });
    changeAvatarModal.hide();
  

    
    super({
      buttonChangeAvatar,
      buttonAddUser,
      buttonDeleteUser,
      buttonDeleteDialog,

      deleteChatModal,
      addUserModal,
      deleteUserModal,
      changeAvatarModal,
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

  private __closeChangeAvatar() {
    const changeAvatarModal = this.children
      .changeAvatarModal as ChatDeleteUserModal;
      changeAvatarModal.hide();
  }

  private __openChangeAvatar() {
    const changeAvatarModal = this.children
      .changeAvatarModal as ChatDeleteUserModal;
      changeAvatarModal.show();
  }

  toggleVisibility() {
    this.element?.style.display === 'none' ? this.show() : this.hide();
  }
  render() {
    return this.compile(template, { ...this.props });
  }
}

import './chat.scss';
import template from './chat.hbs?raw';
import { Block } from '../../../../shared/lib';
import { Avatar, Button, Input } from '../../../../shared/ui';
import { DialogNoLayout } from '../dialog-no-layout';
import { DIALOG_ICONS, DIALOG_MESSAGE, DIALOGS } from '../../lib/constants';
import { DialogActions } from '../dialog-actions';
import { DialogAddUserModal } from '../dialog-add-user-modal';
import { DialogDeleteUserModal } from '../dialog-delete-user-modal';
import { DialogAttachments } from '../dialog-attachments';
import { MessageBubble } from '../message-bubble';
import { ChatDialog, ChatDialogMessage } from '../../lib/models';
import { MessagesGroup } from '../messages-group';
import { DialogDeleteDialogModal } from '../dialog-delete-dialog';

interface DialogProps extends CompileOptions {
  id?: number;
  title?: string;
  avatar?: string;
  // messages?: ChatDialogMessage[];
  // В телеге есть интересный функционал, когда пишешь с мобилки и набираемый текст отображается в любом клиенте телеграма
  currentInputMessage?: string;
}

// TODO: Запрос на получение диалога
export const getDialogData = (id: number): ChatDialog | undefined => {
  const dialog = DIALOGS.find(dialog => dialog.id === id);
  return dialog;
};

export class Chat extends Block {
  constructor({ id=0, title='', avatar }: DialogProps) {
    // Header
    const dialogAvatar = new Avatar({
      src: avatar,
      class: 'user-avatar',
    });

    // Send message
    const messageInput = new Input({
      id: 'message',
      name: 'message',
      placeholder: 'Введите сообщение',
      onChange: (e: Event) => this.__handleChangeMessageInput(e),
    });

    const attachButton = new Button({
      text: '',
      variant: 'secondary',
      icon: DIALOG_ICONS.ATTACH,
      class: 'buttons',
      onClick: () => this.__handleAttachButtonClick(),
    });

    const attachments = new DialogAttachments({
      onAttach: (file: File) => this.__handleAttachFile(file),
    });
    attachments.hide();

    const sendButton = new Button({
      text: '',
      variant: 'primary',
      icon: DIALOG_ICONS.SEND,
      class: 'buttons send',
      onClick: () => this.__handleSendMessage(),
    });

    // Actions
    const actionsButton = new Button({
      class: 'burger',
      icon: DIALOG_ICONS.ACTION,
      text: '',
      onClick: () => this.__handleDialogSettingsClick(),
    });

    const actions = new DialogActions({
      onUserAdd: () => this.__handleAddUserClick(),
      onUserDelete: () => this.__handleDeleteUserClick(),
      onDialogDelete: () => this.__handleDeleteDialogClick(),
    });
    actions.hide();

    const addUserModal = new DialogAddUserModal({
      onApply: () => this.__closeAddUser(),
      onClose: () => this.__closeAddUser(),
    });
    addUserModal.hide();

    const deleteUserModal = new DialogDeleteUserModal({
      onApply: () => this.__closeDeleteUser(),
      onClose: () => this.__closeDeleteUser(),
    });
    deleteUserModal.hide();

    const deleteDialogModal = new DialogDeleteDialogModal({
      onApply: () => this.__closeDeleteDialog(),
      onClose: () => this.__closeDeleteDialog(),
    });
    deleteDialogModal.hide();

    // Body
    // let body;
    // let errorBody;
    // if (!dialogData) {
    //   errorBody = new DialogNoLayout({
    //     message: DIALOG_MESSAGE.NO_DIALOG_DATA,
    //   });
    // } else if (!dialogData?.messages?.length) {
    //   errorBody = new DialogNoLayout({
    //     message: DIALOG_MESSAGE.NO_DIALOG_MESSAGES,
    //   });
    // } else {
    //   const messages = (dialogData.messages as ChatDialogMessage[]).map(
    //     ({ message, senderId, isRead, attachment }) => {
    //       return new MessageBubble({
    //         message,
    //         time: '12:45',
    //         attachment: attachment,
    //         isRead,
    //         isOuter: senderId !== CURRENT_USER_ID,
    //       });
    //     },
    //   );
    //   // TODO: Брать из timestamp сообщений дату и делать MessagesGroup по каждому дню
    //   body = new MessagesGroup({
    //     date: '19 июня',
    //     messages,
    //   });
    // }

    super({
      id,
      title,
      avatar: dialogAvatar,
      actionsButton,
      actions,

      // body,
      // errorBody,

      messageInput,
      attachButton,
      attachments,
      sendButton,

      addUserModal,
      deleteUserModal,
      deleteDialogModal,
    });
  }

  private __handleChangeMessageInput(e: Event) {
    const target = e.target as HTMLInputElement;
    this.setProps({ currentInputMessage: target.value });
  }

  private __handleSendMessage() {
    console.log('SEND_MESSAGE: ', this.props.currentInputMessage);
  }

  private __handleDialogSettingsClick() {
    (this.children.actions as DialogActions).toggleVisibility();
  }

  private __handleAddUserClick() {
    const addUserModal = this.children.addUserModal as DialogAddUserModal;
    addUserModal.show();
  }

  private __closeAddUser() {
    const addUserModal = this.children.addUserModal as DialogAddUserModal;
    addUserModal.hide();
  }

  private __closeDeleteUser() {
    const deleteUserModal = this.children
      .deleteUserModal as DialogDeleteUserModal;
    deleteUserModal.hide();
  }

  private __closeDeleteDialog() {
    const deleteDialogModal = this.children
      .deleteDialogModal as DialogDeleteUserModal;
    deleteDialogModal.hide();
  }

  private __handleDeleteUserClick() {
    const deleteUserModal = this.children
      .deleteUserModal as DialogDeleteUserModal;
    deleteUserModal.show();
  }

  private __handleDeleteDialogClick() {
    const deleteDialogModal = this.children
      .deleteDialogModal as DialogDeleteUserModal;
    deleteDialogModal.show();
  }

  private __handleAttachButtonClick() {
    (this.children.attachments as DialogActions).toggleVisibility();
  }

  private __handleAttachFile(file: File) {
    console.log('SEND_ATTACHMENT: ', file.name, '---');
    // TODO: Отправка файла в диалог
    const attachments = this.children.attachments as DialogActions;
    attachments.toggleVisibility();
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}

import './chat.scss';
import template from './chat.hbs?raw';
import { Block, store } from '../../../../shared/lib';
import { Avatar, Button, Input } from '../../../../shared/ui';
import { DIALOG_ICONS, DIALOG_MESSAGE } from '../../lib/constants';
import { ChatActions } from '../chat-actions';
import { ChatAddAttachment } from '../chat-add-attachment';
import { messageController } from '../../controller';
import { ChatErrorLayout } from '../chat-error-layout';
import { Dialog, Message } from '../../lib';
import { MessageBubble } from '../message-bubble';
import { MessagesGroup } from '../messages-group';
import { getDayMonth, getMessageTime } from '../../lib/utils';
import { ChatBody } from './body';
import { withStore } from '../../../../shared/hoc';
import { MessagesList } from './messages-list';

interface ChatProps extends CompileOptions {
  selectedDialog?: Dialog;
  id?: number
  title?: string
  avatar?: string

  currentInputMessage?: string;
  isLoadingOldMsg?: boolean;
}

const withMessages = withStore(
  ({ messages, isLoadingOldMsg, isLoadingMsg }) => {
    return { messages: [...(messages || [])].reverse(), isLoadingOldMsg, isLoadingMsg };
  },
);

export class Chat extends Block {
  constructor({
    id = 0, title = '', avatar
    // selectedDialog,
  }: ChatProps) {
    // Header
    const dialogAvatar = new Avatar({
      srcPath: avatar,
      // srcPath: selectedDialog?.avatar,
      class: 'user-avatar',
    });

    // Send message
    const messageInput = new Input({
      id: 'message',
      name: 'message',
      placeholder: 'Написать сообщение...',
      onChange: (e: Event) => this.__handleChangeMessageInput(e),
    });

    const attachButton = new Button({
      text: '',
      variant: 'secondary',
      icon: DIALOG_ICONS.ATTACH,
      class: 'buttons',
      onClick: () => this.__handleAttachButtonClick(),
    });

    const attachments = new ChatAddAttachment({
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

    const noDialog = new ChatErrorLayout({
      message: DIALOG_MESSAGE.NO_DIALOG_SELECTED,
    });
    const actions = new ChatActions({
      chatId: id
    });
    actions.hide();

    const MessagesListConnected = withMessages(MessagesList as typeof Block);
    const body = new ChatBody({
      messages: new MessagesListConnected({}) as MessagesList,
    });

    super({
      // selectedDialog,
      id,
      title,
      avatar: dialogAvatar,
      actionsButton,
      actions,

      body,

      messageInput,
      attachButton,
      attachments,
      sendButton,

      noDialog,
    });
  }

  private __handleChangeMessageInput(e: Event) {
    const target = e.target as HTMLInputElement;
    this.setProps({ currentInputMessage: target.value });
  }

  private __handleSendMessage() {
    const { currentInputMessage } = this.props as ChatProps;
    if (!currentInputMessage?.length) {
      alert('Сообщение не может быть пустым');
      return;
    }

    const messageInput = this.children.messageInput as Input;
    messageInput.setProps({ value: '' });
    this.setProps({ currentInputMessage: '' });
    messageController.sendMessage(currentInputMessage || '');
  }

  private __handleDialogSettingsClick() {
    (this.children.actions as ChatActions).toggleVisibility();
  }

  private __handleAttachButtonClick() {
    (this.children.attachments as ChatActions).toggleVisibility();
  }

  private __handleAttachFile(file: File) {
    console.log('SEND_ATTACHMENT: ', file.name, '---');
    // TODO: Отправка файла в диалог
    const attachments = this.children.attachments as ChatActions;
    attachments.toggleVisibility();
  }

  renderMessagesBlock(messages: Message[]) {
    if (!messages.length) {
      return new ChatErrorLayout({
        message: DIALOG_MESSAGE.NO_DIALOG_MESSAGES,
      });
    }
    const currUser = store.getState().user;
    const messagesByDate: Record<string, MessageBubble[]> = {};

    messages.forEach(({ id, type, content, time, is_read, user_id }) => {
      const messageDate = new Date(time);
      const key = getDayMonth(messageDate);
      const messageComponent = new MessageBubble({
        id,
        content,
        time: getMessageTime(time),
        type,
        // attachment: attachment,
        isRead: is_read,
        isOuter: currUser ? currUser.id !== user_id : false,
      });
      if (Object.keys(messagesByDate).includes(key)) {
        messagesByDate[key].push(messageComponent);
      } else {
        messagesByDate[key] = [messageComponent];
      }
    });

    return Object.keys(messagesByDate).map((day) => {
      return new MessagesGroup({
        date: day,
        messages: messagesByDate[day],
      });
    });
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}

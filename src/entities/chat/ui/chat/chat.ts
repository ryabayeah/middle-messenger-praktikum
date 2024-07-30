import './chat.scss';
import template from './chat.hbs?raw';
import { Block, store } from '../../../../shared/lib';
import { Avatar, Button, Input } from '../../../../shared/ui';
import { DIALOG_ICONS, DIALOG_MESSAGE } from '../../lib/constants';
import { ChatActions } from '../chat-actions';
import { ChatAddAttachment } from '../chat-add-attachment';
import { messageController } from '../../controller';
import { ChatErrorLayout } from '../chat-error-layout';
import { Message } from '../../lib';
import { isEqual } from '../../../../shared/utils';
import { MessageBubble } from '../message-bubble';
import { userController } from '../../../user/controller';
import { MessagesGroup } from '../messages-group';
import { getDayMonth, getMessageTime, isDatesEqual } from '../../lib/utils';

interface ChatProps extends CompileOptions {
  id?: number;
  title?: string;
  avatar?: string;
  // messages?: ChatDialogMessage[];
  // В телеге есть интересный функционал, когда пишешь с мобилки и набираемый текст отображается в любом клиенте телеграма
  currentInputMessage?: string;
  messages?: Message[];
}

export class Chat extends Block {
  constructor({ id = 0, title = '', avatar, messages }: ChatProps) {
    // Header
    const dialogAvatar = new Avatar({
      srcPath: avatar,
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
      chatId: id,
    });
    actions.hide();

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

      noDialog,
    });
  }

  componentDidMount(oldProps?: ChatProps): void {
    this.setProps({ noDialog: Boolean(oldProps?.id || 0) });
  }

  componentDidUpdate(oldProps: ChatProps, newProps: ChatProps): boolean {
    if (
      JSON.stringify(oldProps.messages) !== JSON.stringify(newProps.messages)
    ) {
      this.setChildren({
        body: this.renderMessagesBlock(newProps.messages || []),
      });
    }
    return true;
  }

  private __handleChangeMessageInput(e: Event) {
    const target = e.target as HTMLInputElement;
    this.setProps({ currentInputMessage: target.value });
  }

  private __handleSendMessage() {
    const { currentInputMessage } = this.props as ChatProps;
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
    const currUser = store.getState().user;
    const messagesByDate: Record<string, MessageBubble[]> = {}

    messages.forEach(({ id, type, content, time, is_read, user_id })=>{
      const messageDate = new Date(time)
      const key = getDayMonth(messageDate)
      const messageComponent = new MessageBubble({
        id,
        content,
        time: getMessageTime(time),
        type,
        // attachment: attachment,
        isRead: is_read,
        isOuter: currUser ? currUser.id !== user_id : false,
      });
      if (Object.keys(messagesByDate).includes(key)){
        messagesByDate[key].push(messageComponent)
      } else {
        messagesByDate[key] = [messageComponent]
      }
    })

    
    // console.log(messagesByDate, "---")
    // const renderMessages = messages.map(
    //   ({ id, type, content, time, is_read, user_id }) => {
    //     return new MessageBubble({
    //       id,
    //       content,
    //       time: getMessageTime(time),
    //       type,
    //       // attachment: attachment,
    //       isRead: is_read,
    //       isOuter: currUser ? currUser.id !== user_id : false,
    //     });
    //   },
    // );
    // // TODO: Брать из timestamp сообщений дату и делать MessagesGroup по каждому дню
    return Object.keys(messagesByDate).map((day)=>{
      return new MessagesGroup({
        date: day,
        messages: messagesByDate[day],
      })
    });
  }
  render() {
    return this.compile(template, { ...this.props });
  }
}

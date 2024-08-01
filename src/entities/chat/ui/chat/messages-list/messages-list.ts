import template from './messages-list.hbs?raw';
import { Block, store } from '../../../../../shared/lib';
import { DIALOG_MESSAGE, Message } from '../../../lib';
import { ChatErrorLayout } from '../../chat-error-layout';
import { MessageBubble } from '../../message-bubble';
import { getDayMonth, getMessageTime } from '../../../lib/utils';
import { MessagesGroup } from '../../messages-group';

interface MessagesListProps extends CompileOptions {
  messages?: Message[];
  isLoadingOldMsg?: boolean
}

export class MessagesList extends Block {
  constructor(props: MessagesListProps) {
    super({
      ...props,
    });
  }

  // TODO: Убрать из Block
  componentDidRender(_oldProps?: unknown): boolean {
    return true
  }

  componentDidUpdate(
    oldProps: MessagesListProps,
    newProps: MessagesListProps,
  ): boolean {
    if (
      JSON.stringify(oldProps.messages) !== JSON.stringify(newProps.messages)
    ) {
      this.setChildren({
        body: this.renderMessagesBlock(newProps.messages || []),
      });
    }
    
    return true;
  }

  renderMessagesBlock(messages: Message[]) {
    if (!messages.length) {
      return new ChatErrorLayout({
        message: DIALOG_MESSAGE.NO_DIALOG_MESSAGES,
      });
    }
    const currUser = store.getState().user;
    const messagesByDate: Record<string, MessageBubble[]> = {};

    const isFirstMessages = messages.length <= 20

    messages.forEach(({ id, type, content, time, is_read, user_id }, i) => {
      const messageDate = new Date(time);
      const key = getDayMonth(messageDate);

      const isLastMessage = 
      isFirstMessages && messages.length - 1 === i ||
      // TODO: плохое условие (элементов новых может быть меньше 20 и будет дергаться к старым элементам)
      !isFirstMessages && messages.length - 20 === i

      const messageComponent = new MessageBubble({
        id,
        content,
        time: getMessageTime(time),
        type,
        class: isLastMessage? 'last' : undefined,
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
    console.log('----ml')
    return this.compile(template, { ...this.props });
  }
}

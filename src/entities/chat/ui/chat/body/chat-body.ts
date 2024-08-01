import template from './chat-body.hbs?raw';
import { Block } from '../../../../../shared/lib';
import { messageController } from '../../../controller';
import { MessagesList } from '../messages-list';

interface ChatBodyProps extends CompileOptions {
  messages: MessagesList;
}

export class ChatBody extends Block {
  constructor(props: ChatBodyProps) {
    super({
      ...props,
      events: {
        scroll: () => this.handleScroll(),
      },
    });
  }

  handleScroll() {
    const node = this.getContent();
    const blockHeight = node.clientHeight;
    const scrollPositionY = node.scrollHeight + node.scrollTop - 20;
    if (blockHeight > scrollPositionY) {
      messageController.getMessages();
    }
  }
  render() {
    return this.compile(template, { ...this.props });
  }
}

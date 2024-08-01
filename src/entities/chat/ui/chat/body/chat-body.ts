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
        scroll: () => {
          const node = this.getContent();
          const blockHeight = node.clientHeight;
          const scrollPositionY = node.scrollHeight + node.scrollTop - 20;
          if (blockHeight > scrollPositionY) {
            messageController.getMessages();
            //   const lastMessage = node.querySelector('.last')?.clientHeight
            //   if (lastMessage){
            //     this.getContent().scrollBy(0, lastMessage)
            //   }
            node.scrollBy(0, 100);
          }

          console.log(blockHeight > scrollPositionY);
        },
      },
    });
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}

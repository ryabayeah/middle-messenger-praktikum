import { chatController } from '../../entities/chat/controller';
import { ChatsLayout } from '../../layouts';

export class ChatsPage extends ChatsLayout {
  componentDidMount(_oldProps?: unknown[]): void {
    this. uploadChats();
  }
  async uploadChats() {
    await chatController.getChats();
  }
}

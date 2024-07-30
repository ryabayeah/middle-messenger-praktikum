import { store } from '../../../shared/lib/store';
import { Message } from '../lib';
import { chatController } from './chat-controller';

export class MessageController {
  sendMessage(content: string) {
    const state = store.getState()
    if (!content) {
      return;
    }
    state.dialogSocket?.sendMessage(content)
  }
  async setMessages(data: Message[] | Message) {
    const state = store.getState()
    if (Array.isArray(data)) {
      store.set('messages', data.reverse());
    } else {
      if (data.type === 'message') {
        store.set('messages', [...state.messages || [], data]);

        if (data.user_id === state.user?.id) {
          return;
        }
      }
    }

    await chatController.getChats();
  }

  getMessages(): void {
    // if (this._allMessage) {
    //     return;
    // }

    store.getState().dialogSocket?.getMessages(0)

    // this.socket?.send(JSON.stringify({
    //     content: this._offset,
    //     type: 'get old',
    // }));
    // this._offset += 20;
}
}

export const messageController = new MessageController();

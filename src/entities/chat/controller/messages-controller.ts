import { store } from '../../../shared/store/store';
import { chatController } from './chat-controller';

export class MessageController {
  sendMessage(content: string) {
    if (!content) {
      return;
    }

    // store.state.chat?.socket?.sendMessage(content);
  }

  async setMessages(data: Record<string, unknown> | Record<string, unknown>[]) {
    const state = store.getState()
    if (Array.isArray(data)) {
      store.set('selectedDialogMessages', data.reverse());
    } else {
      if (data.type === 'message') {
        store.set('selectedDialogMessages', [...state.selectedDialogMessages || [], data]);

        if (data.user_id === state.user?.id) {
          return;
        }
      }
    }

    await chatController.getChats();
  }
}

export const messageController = new MessageController();

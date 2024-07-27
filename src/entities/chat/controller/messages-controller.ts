import { store } from '../../../shared/store/store';
import { chatController } from './chat-controller';

export class MessageController {
  sendMessage(content: string) {
    const state = store.getState()
    if (!content) {
      return;
    }
    console.log(content, state, "----")
    state.dialogSocket?.sendMessage(content)
  }

  getOldMessages(){
    store.getState().dialogSocket?.getOldMessages()
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

import { ApiError } from '../../../shared/api';
import { store } from '../../../shared/store/store';
import { chatApi } from '../api';
import { Dialog } from '../lib';

export class ChatController {
  async getChats() {
    await chatApi
      .getChats()
      .then((dialogs) => {
        store.set('dialogs', dialogs as Dialog[]);
      })
      .catch((error: ApiError) => {
        // if (error.reason === 'User already in system') {
        //   router.go(APP_PATH.CHATS);
        // }
      });
  }
  async createChat(title: string) {
    await chatApi
      .createChat(title)
      .then(() => {
        this.getChats()
      })
      .catch((error: ApiError) => {
        // if (error.reason === 'User already in system') {
        //   router.go(APP_PATH.CHATS);
        // }
      });
  }
}

export const chatController = new ChatController();

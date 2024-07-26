import { ApiError } from '../../../shared/api';
import { store } from '../../../shared/store/store';
import { chatApi } from '../api';
import { Dialog } from '../lib';
import { GetChatsParams } from '../model/api';

export class ChatController {
  async getChats(body?: GetChatsParams) {
    await chatApi
      .getChats(body)
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
  async getChatUsers(title: string) {
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

  selectChat(dialog?: Dialog){
    store.set('selectedDialog', JSON.parse(JSON.stringify(dialog)));
  }
}

export const chatController = new ChatController();

import { ApiError } from '../../../shared/api';
import { Socket } from '../../../shared/lib';
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

  async connectToChat(chatId: number) {
    await chatApi
      .getChatToken(chatId)
      .then((resp) => {
        const {token}  = resp as {token: string}
        if (token){
          const socket = new Socket({chatId, token: token.toString()})
          console.log(socket.getOldMessages())
          store.set('dialogSocket', socket)
          
        }
      })
      .catch(() => {
      });
  }
}

export const chatController = new ChatController();

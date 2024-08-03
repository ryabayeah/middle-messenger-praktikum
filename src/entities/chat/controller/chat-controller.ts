import { store } from '../../../shared/lib/store';
import { apiBaseErrorHandler } from '../../../shared/utils';
import { userController } from '../../user/controller';
import { chatApi } from '../api';
import { Dialog } from '../lib';
import { GetChatsParams } from '../model/api';
import { messageController } from './messages-controller';

export class ChatController {
  async getChats(body?: GetChatsParams) {
    await chatApi
      .getChats(body)
      .then((dialogs) => {
        store.set('dialogs', dialogs as Dialog[]);
      })
      // TODO: Если 500, то редиректить на 500
      .catch(apiBaseErrorHandler);
  }
  async createChat(title: string) {
    await chatApi
      .createChat(title)
      .then(() => {
        this.getChats();
      })
      .catch(apiBaseErrorHandler);
  }
  async deleteChat(id: number) {
    return await chatApi
      .deleteChat(id)
      .then(() => {
        chatController.selectChat();
        this.getChats();
      })
      .catch(apiBaseErrorHandler);
  }
  async getChatUsers(chatId: number) {
    return await chatApi
      .getChatUsers(chatId)
      .then((users) => {
        // console.log(users);
        store.set('dialogUsers', users);
        return users;
      })
      .catch(apiBaseErrorHandler);
  }

  async addUserToChat(login: string, chatId: number) {
    const users = await userController.search(login);
    if (users.length === 1) {
      return await chatApi
        .addUsers([users[0].id], chatId)
        .then(() => {
          this.getChatUsers(chatId);
        })
        .catch(apiBaseErrorHandler);
    } else {
      throw new Error(`Пользователь с логином ${login} не найден`);
    }
  }

  async deleteUserFromChat(login: string, chatId: number) {
    const users = await userController.search(login);
    if (users.length === 1) {
      return await chatApi
        .deleteUsers([users[0].id], chatId)
        .then(() => {
          this.getChatUsers(chatId);
        })
        .catch(apiBaseErrorHandler);
    } else {
      throw new Error(`Пользователь с логином ${login} не найден`);
    }
  }

  selectChat(dialog?: Dialog) {
    store.set(
      'selectedDialog',
      dialog ? JSON.parse(JSON.stringify(dialog)) : undefined,
    );

    if (dialog) {
      this.getChatUsers(dialog.id);
      messageController.connectToChat(dialog.id);
    }
  }
}

export const chatController = new ChatController();

import { ApiError } from '../../../shared/api';
import { store } from '../../../shared/lib/store';
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
      .catch((error: ApiError) => {
        throw new Error(error.reason);
      });
  }
  async createChat(title: string) {
    await chatApi
      .createChat(title)
      .then(() => {
        this.getChats();
      })
      .catch((error: ApiError) => {
        throw new Error(error.reason);
      });
  }
  async deleteChat(id: number) {
    return await chatApi
      .deleteChat(id)
      .then(() => {
        this.getChats();
      })
      .catch((error: ApiError) => {
        throw new Error(error.reason);
      });
  }
  async getChatUsers(title: string) {
    await chatApi
      .createChat(title)
      .then(() => {
        this.getChats();
      })
      .catch((error: ApiError) => {
        throw new Error(error.reason);
      });
  }

  async addUserToChat(login: string, chatId: number) {
    const users = await userController.search(login);
    if (users.length === 1) {
      await chatApi
        .addUsers([users[0].id], chatId)
        .then(() => {})
        .catch(() => {});
    }
  }

  async deleteUserFromChat(login: string, chatId: number) {
    const users = await userController.search(login);
    if (users.length === 1) {
      await chatApi
        .deleteUsers([users[0].id], chatId)
        .then(() => {})
        .catch(() => {});
    }
  }

  selectChat(dialog?: Dialog) {
    store.set(
      'selectedDialog',
      dialog ? JSON.parse(JSON.stringify(dialog)) : undefined,
    );

    if (dialog) {
      messageController.connectToChat(dialog.id);
    }
  }
}

export const chatController = new ChatController();

import { yandexApi } from '../../../shared/api';
import { BaseAPI } from '../../../shared/lib';
import { User } from '../../user/model';
import { ChatDialogShort, Message } from '../lib';
import { GetChatsParams } from '../model/api';

export type Chat = {
  id: number;
  title: string;
  avatar: string;
  unread_count: number;
  created_by: number;
  last_message?: Message | null;
};

enum CHAT_API_PATH {
  CHATS = '/chats',
  TOKEN = '/chats/token/',
  USERS = '/chats/users',
  AVATAR = '/chats/avatar',
  CHAT_USERS = '/users',
}

class ChatAPI extends BaseAPI {
  async getChats(params?: GetChatsParams): Promise<Chat[]> {
    return yandexApi.get(CHAT_API_PATH.CHATS, { data: { ...params } });
  }
  async createChat(title: string) {
    return yandexApi.post(CHAT_API_PATH.CHATS, { data: { title } });
  }
  async deleteChat(chatId : number) {
    return yandexApi.delete(CHAT_API_PATH.CHATS, { data: { chatId  } });
  }
  async getChatToken(id: number) {
    return yandexApi.post(`${CHAT_API_PATH.TOKEN}${id}`);
  }
  async getChatUsers(id: number): Promise<User[]> {
    return yandexApi.get(`${CHAT_API_PATH.CHATS}/${id}${CHAT_API_PATH.CHAT_USERS}`);
  }
  async addUsers(ids: number[], chatId: number) {
    return yandexApi.put(`${CHAT_API_PATH.USERS}`, {
      data: { users: ids, chatId },
    });
  }
  async deleteUsers(ids: number[], chatId: number) {
    return yandexApi.delete(`${CHAT_API_PATH.USERS}`, {
      data: { users: ids, chatId },
    });
  }
  async updateChatAvatar(data: FormData): Promise<ChatDialogShort> {
    return yandexApi.put(CHAT_API_PATH.AVATAR, {
      data,
    });
  }
}

export const chatApi = new ChatAPI();

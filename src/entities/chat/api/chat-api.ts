import { yandexApi } from '../../../shared/api';
import { BaseAPI } from '../../../shared/lib';
import { GetChatsParams } from '../model/api';

type User = {
  id: number;
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
  avatar: string;
};

type Message = {
  user: User;
  time: string;
  content: string;
};

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
}

class ChatAPI extends BaseAPI {
  async getChats(params?: GetChatsParams): Promise<Chat[]> {
    return yandexApi.get(CHAT_API_PATH.CHATS, { data: { ...params } });
  }
  async createChat(title: string) {
    return yandexApi.post(CHAT_API_PATH.CHATS, { data: { title } });
  }
  async getChatToken(id: number) {
    return yandexApi.post(`${CHAT_API_PATH.TOKEN}${id}`);
  }
}

export const chatApi = new ChatAPI();

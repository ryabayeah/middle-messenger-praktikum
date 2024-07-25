import { yandexApi } from '../../../shared/api';
import { BaseAPI } from '../../../shared/lib';

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
  GET_CHATS = '/chats',
}

class ChatAPI extends BaseAPI {
  async getChats(): Promise<Chat[]> {
    return yandexApi.get(CHAT_API_PATH.GET_CHATS);
  }
}

export const chatApi = new ChatAPI();

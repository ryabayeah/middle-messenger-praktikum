import { yandexApi } from '../../../shared/api';
import { BaseAPI } from '../../../shared/lib/base-api';
import { UpdateUserData, UpdateUserPasswordData, User } from '../model';


enum USER_API_PATH {
  SEARCH = '/user/search',
  UPDATE = '/user/profile',
  UPDATE_AVATAR = '/user/profile/avatar',
}

class UserAPI extends BaseAPI {
  async search(login: string): Promise<User[]> {
    return yandexApi.post(USER_API_PATH.SEARCH, { data: { login } });
  }
  async updateUser(data: UpdateUserData): Promise<User> {
    return yandexApi.put(USER_API_PATH.UPDATE, { data });
  }
  async updateUserAvatar(file: FormData): Promise<User> {
    return yandexApi.put(USER_API_PATH.UPDATE_AVATAR, { data: file });
  }
  async updateUserPassword(data: UpdateUserPasswordData) {
    return yandexApi.put(USER_API_PATH.UPDATE, { data });
  }
}

export const userApi = new UserAPI();

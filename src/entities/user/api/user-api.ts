import { yandexApi } from '../../../shared/api';
import { BaseAPI } from '../../../shared/lib/base-api';
import { User } from '../model';


enum USER_API_PATH {
  SEARCH = '/user/search',
}

class UserAPI extends BaseAPI {
  async search(login: string): Promise<User[]> {
    return yandexApi.post(USER_API_PATH.SEARCH, { data: { login } });
  }
}

export const userApi = new UserAPI();

import { yandexApi } from '../../../shared/api';
import { BaseAPI } from '../../../shared/lib/base-api';

enum USER_API_PATH {
  GET_CURRENT_USER = '/auth/user',
}

class UserAPI extends BaseAPI {
  async getCurrentUser() {
    return yandexApi
      .get(USER_API_PATH.GET_CURRENT_USER, {})
      .then((resp) => resp);
  }
}

export const userApi = new UserAPI();

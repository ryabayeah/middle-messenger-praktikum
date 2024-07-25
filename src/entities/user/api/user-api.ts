import { BaseAPI } from '../../../shared/lib/base-api';


class UserAPI extends BaseAPI {
  // async getCurrentUser() {
  //   return yandexApi
  //     .get(USER_API_PATH.GET_CURRENT_USER, {})
  //     .then((resp) => resp);
  // }
}

export const userApi = new UserAPI();

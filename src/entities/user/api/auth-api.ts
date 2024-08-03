import { yandexApi } from '../../../shared/api';
import { BaseAPI } from '../../../shared/lib';
import { SignInData, SignUpData } from '../model';

enum AUTH_API_PATH {
  SIGN_UP = '/auth/signup',
  SIGN_IN = '/auth/signin',
  LOG_OUT = '/auth/logout',
  GET_CURRENT_USER = '/auth/user',
}

class AuthAPI extends BaseAPI {
  async signup(data: SignUpData) {
    return yandexApi.post(AUTH_API_PATH.SIGN_UP, { data });
  }
  async signin(data: SignInData) {
    return yandexApi.post(AUTH_API_PATH.SIGN_IN, { data });
  }
  async logout() {
    return yandexApi.post(AUTH_API_PATH.LOG_OUT);
  }
  async getCurrentUser() {
    return yandexApi.get(AUTH_API_PATH.GET_CURRENT_USER);
  }
}

export const authApi = new AuthAPI();

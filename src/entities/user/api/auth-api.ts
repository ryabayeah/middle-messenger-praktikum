import { yandexApi } from '../../../shared/api';
import { BaseAPI } from '../../../shared/lib';

enum AUTH_API_PATH {
  SIGN_UP = '/auth/signup',
  SIGN_IN = '/auth/signin',
  LOG_OUT = '/auth/logout',
}

export type SignUpData = {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  phone: string;
  password: string;
};

export type SignInData = {
  login: string;
  password: string;
};

class AuthAPI extends BaseAPI {
  async signup(data: SignUpData) {
    return yandexApi
      .post(AUTH_API_PATH.SIGN_UP, {
        data,
      })
      .then((resp) => resp);
  }

  async signin(data: SignInData) {
    return yandexApi.post(AUTH_API_PATH.SIGN_IN, {
      data,
    });
  }
  async logout() {
    return yandexApi.post(AUTH_API_PATH.LOG_OUT, {});
  }
}

export const authApi = new AuthAPI();

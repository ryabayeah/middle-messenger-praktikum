import { ApiError } from '../../../shared/api';
import { APP_PATH } from '../../../shared/constants';
import { router, store } from '../../../shared/lib';
import { apiBaseErrorHandler } from '../../../shared/utils';
import { authApi } from '../api';
import { SignInData, SignUpData, User } from '../model';

export class AuthController {
  // TODO: Как разрешат, то добавить md5 для хэша пароля
  async signIn(data: SignInData) {
    await authApi
      .signin(data)
      .then(() => {
        router.go(APP_PATH.CHATS);
      })
      .catch((error: ApiError) => {
        console.log(error, "-error")
        let errorMessage = '';
        if (error.reason === 'User already in system') {
          router.go(APP_PATH.CHATS);
          return;
        }
        if (error.reason === 'Login or password is incorrect') {
          console.log("--")
          errorMessage = 'Некорректный логин или пароль';
        }

        if (!errorMessage) {
          apiBaseErrorHandler(error);
          return;
        } else {
          throw new Error(errorMessage);
        }
      });
  }

  async getUser(): Promise<User | null> {
    return await authApi
      .getCurrentUser()
      .then((user) => {
        store.set('user', user);
        return user as User;
      })
      .catch((error: ApiError) => {
        store.set('user', null);
        // Обрабатывается в main.ts
        throw new Error(error.reason);
      });
  }

  // TODO: Как разрешат, то добавить md5 для хэша пароля
  async signUp(data: SignUpData) {
    await authApi
      .signup(data)
      .then(() => {
        router.go(APP_PATH.CHATS);
      })
      .catch((error: ApiError) => {
        let errorMessage = '';
        if (error.reason === 'User already in system') {
          router.go(APP_PATH.CHATS);
          return;
        }

        if (error.reason === 'Login already exists') {
          errorMessage = 'Пользователь с таким логином уже существует';
        }

        if (!errorMessage) {
          apiBaseErrorHandler(error);
          return;
        } else {
          throw new Error(errorMessage);
        }
      });
  }

  async logout() {
    await authApi
      .logout()
      .then(() => {
        store.reset();
        // TODO: вырубить сокет
        router.go(APP_PATH.LOGIN);
      })
      .catch((error: ApiError) => {
        throw new Error(error.reason);
      });
  }
}

export const authController = new AuthController();

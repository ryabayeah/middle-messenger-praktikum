import { ApiError } from '../../../shared/api';
import { APP_PATH } from '../../../shared/constants';
import { router, store } from '../../../shared/lib';
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
        if (error.reason === 'User already in system') {
          router.go(APP_PATH.CHATS);
        }
        if (error.reason === 'Login or password is incorrect') {
          alert('Некорректный логин или пароль.')
        }
       
      });
  }

  async getUser(): Promise<User> {
    store.set('isLoadingUser', true);
    return await authApi
      .getCurrentUser()
      .then((user) => {
        store.set('isLoadingUser', false);

        store.set('user', user);
        return user as User;
      })
      .catch((error: ApiError) => {
        store.set('isLoadingUser', false);

        store.set('user', null);
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
        if (error.reason === 'User already in system') {
          router.go(APP_PATH.CHATS);
        }

        if (error.reason === 'Login already exists') {
          alert('Пользователь с таким логином уже существует.');
        }
      });
  }

  async logout() {
    await authApi
      .logout()
      .then(() => {
        store.reset()
        // TODO: вырубить сокет
        router.go(APP_PATH.LOGIN);
      })
      .catch((error: ApiError) => {
        throw new Error(error.reason);
      });
  }
}

export const authController = new AuthController();

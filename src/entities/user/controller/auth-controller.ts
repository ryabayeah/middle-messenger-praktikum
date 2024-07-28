import { ApiError } from '../../../shared/api';
import { APP_PATH } from '../../../shared/constants';
import { router, store } from '../../../shared/lib';
import { authApi } from '../api';
import { SignInData, SignUpData, User } from '../model';

export class AuthController {
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
      });
  }

  async getUser(): Promise<User> {
    store.set('isLoading.isLoadingUser', true)
    return await authApi
      .getCurrentUser()
      .then((user) => {
        store.set('isLoading.isLoadingUser', false)

        store.set('user', user);
        return user as User;
      })
      .catch((error: ApiError) => {
        store.set('isLoading.isLoadingUser', false)

        store.set('user', null);
        throw new Error(error.reason);
      });
  }

  async singUp(data: SignUpData) {
    await authApi
      .signup(data)
      .then(() => {
        router.go(APP_PATH.CHATS);
      })
      .catch((error: ApiError) => {
        if (error.reason === 'User already in system') {
          router.go(APP_PATH.CHATS);
        }
      });
  }

  async logout() {
    await authApi
      .logout()
      .then(() => {
        router.go(APP_PATH.LOGIN);
      })
      .catch((error: ApiError) => {
        throw new Error(error.reason);
      });
  }
}

export const authController = new AuthController();

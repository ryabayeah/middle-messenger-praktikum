import { ApiError } from '../../../shared/api';
import { APP_PATH } from '../../../shared/constants';
import { router } from '../../../shared/lib';
import { authApi } from '../api';
import { SignInData, User } from '../model';


export class AuthController {
  async signIn(data: SignInData) {
    await authApi
      .signin(data)
      .then(() => {
        // localStorage.setItem(
        //   LOCAL_STORAGE_KEY.CURRENT_USER,
        //   (response as number).toString(),
        // );
        // this.getUser();
        // router.go(APP_PATH.CHATS);
      })
      .catch((error: ApiError) => {
        if (error.reason === 'User already in system') {
          router.go(APP_PATH.CHATS);
        }
      });
  }
  async getUser() {
    return await authApi
      .getCurrentUser()
      .then((user) => {
        return user as User;
      })
      .catch((error: ApiError) => {
        throw new Error(error.reason);
      });
  }
  //   async singUp(data: SignupData) {
  //     const isValid = submitValidation(data);
  //     if (isValid) {
  //       const response = await this.api.signup(data);
  //       try {
  //         errorHandling(response);
  //         router.go(Routes.Messenger);
  //       } catch (e) {
  //         if (e === 'User already in system') router.go(Routes.Messenger);
  //         else alert(e);
  //       }
  //     }
  //   }

  // async logout() {
  //   const response = await this.api.logout();
  //   try {
  //     errorHandling(response);
  //     MessageController.closeAll();

  //     router.go(Routes.Index);
  //   } catch (e) {
  //     alert(e);
  //   }
  // }
}

export const authController = new AuthController();

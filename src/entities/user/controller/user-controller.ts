import { ApiError } from '../../../shared/api';
import { store } from '../../../shared/lib';
import { userApi } from '../api';
import { UpdateUserData, UpdateUserPasswordData, User } from '../model';

export class UserController {
  async search(login: string): Promise<User[]> {
    return await userApi
      .search(login)
      .then((users) => {
        return users;
      })
      .catch((error: ApiError) => {
        throw new Error(error.reason);
      });
  }

  async updateUserAvatar(avatar: FormData): Promise<User> {
    return await userApi
      .updateUserAvatar(avatar)
      .then((user) => {
        return user;
      })
      .catch((error: ApiError) => {
        throw new Error(error.reason);
      });
  }

  async updateUser(data: UpdateUserData): Promise<User> {
    return await userApi
      .updateUser(data)
      .then((user) => {
        store.set('user', user)
        return user;
      })
      .catch((error: ApiError) => {
        throw new Error(error.reason);
      });
  }
  async updatePassword(data: UpdateUserPasswordData) {
    return await userApi
      .updateUserPassword(data)
      .catch((error: ApiError) => {
        throw new Error(error.reason);
      });
  }
}

export const userController = new UserController();

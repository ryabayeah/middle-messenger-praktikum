import { ApiError } from '../../../shared/api';
import { userApi } from '../api';

export class UserController {
  async search(login: string) {
    return await userApi
      .search(login)
      .then((users) => {
        return users
      })
      .catch((error: ApiError) => {
        throw new Error(error.reason);
      });
  }
}

export const userController = new UserController();

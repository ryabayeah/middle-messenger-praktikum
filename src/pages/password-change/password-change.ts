import { UserPasswordChange } from '../../entities/user/ui';
import { ProfileLayout } from '../../layouts';
import { APP_PATH } from '../../shared/constants';

export class PasswordChangePage extends ProfileLayout {
  constructor() {
    super({
      backPath: APP_PATH.PROFILE,
    body: new UserPasswordChange(),
    });
  }
}

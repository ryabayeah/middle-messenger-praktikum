import { UserPasswordChange } from '../../entities/user/ui';
import { ProfileLayout } from '../../layouts';
import { APP_PATH } from '../../shared/constants';

export const PasswordChangePage = () => {
  return new ProfileLayout({
    backPath: APP_PATH.PROFILE,
    body: new UserPasswordChange(),
  });
};

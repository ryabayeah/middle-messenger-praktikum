import './main.scss';
import {
  ChatsPage,
  PasswordChangePage,
  ProfilePage,
  ServerErrorPage,
  SignUpPage,
  TempNavPage,
  SignInPage,
  NotFoundPage,
} from './pages';
import { APP_PATH } from './shared/constants';
import { authController } from './entities/user/controller';
import { router } from './shared/lib';

const init = async () => {
  const currPath = router.getCurrentRoutePath();
  await authController
    .getUser()
    .then(() => {
      if ([APP_PATH.LOGIN, APP_PATH.REGISTER].includes(currPath as APP_PATH)) {
        router.go(APP_PATH.CHATS);
      }
    })
    .catch(() => {
      if (currPath !== APP_PATH.LOGIN) {
        router.go(APP_PATH.LOGIN);
      }
    });
};

init().then(() => {
  router
    .use(APP_PATH.LOGIN, SignInPage)
    .use(APP_PATH.REGISTER, SignUpPage)
    .use(APP_PATH.ERROR, ServerErrorPage)
    .use(APP_PATH.NOT_FOUND, NotFoundPage)
    .use(APP_PATH.PROFILE, ProfilePage)
    .use(APP_PATH.CHANGE_PASSWORD, PasswordChangePage)
    .use(APP_PATH.CHATS, ChatsPage)
    .use(APP_PATH.NAV, TempNavPage)
    .start();
});

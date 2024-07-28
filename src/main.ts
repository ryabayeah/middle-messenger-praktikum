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
import { router, Store } from './shared/lib';
import { authController } from './entities/user/controller';

// const init = async () => {
//   const currPath = router.getCurrentRoutePath()
//   await authController
//     .getUser()
//     .then(() => {
//       if ([APP_PATH.LOGIN, APP_PATH.REGISTER].includes(currPath)){
//         router.go(APP_PATH.CHATS);
//       }
//     })
//     .catch((err) => {
//       if (currPath !== APP_PATH.LOGIN) {
//         router.go(APP_PATH.LOGIN);
//       }
//     });
// };


document.addEventListener('DOMContentLoaded', () => {
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

    // new Store()
    // init();
});


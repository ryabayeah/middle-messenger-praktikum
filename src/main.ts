import './main.scss';
import { SignInPage } from './pages/sign-in';
import { NotFoundPage } from './pages/not-found';
import {
  ChatsPage,
  PasswordChangePage,
  ProfilePage,
  ServerErrorPage,
  SignUpPage,
  TempNavPage,
} from './pages';
import { APP_PATH } from './shared/constants';
import { router } from './shared/lib';

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

// document.addEventListener('DOMContentLoaded', () => {
//   // route();
// });

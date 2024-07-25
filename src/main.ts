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
import { store } from './shared/store/store';
import { authController } from './entities/user/controller';
import { User } from './entities/user/model';

const initialStateApp = async () => {
  let user: User | null = null;
  try {
    user = await authController.getUser();
    if (user) {
      router.go(APP_PATH.CHATS);
    }
  } catch (error) {
    router.go(APP_PATH.LOGIN);
  }
  store.set('user', user);
  // await updateChats();
};

// initialStateApp();

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

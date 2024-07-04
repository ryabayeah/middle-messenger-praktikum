import "./main.scss";
import { render } from "./shared/utils/renderDom";
import { SignInPage } from "./pages/sign-in";
import { Block } from "./shared/lib/block";
import { NotFoundPage } from "./pages/not-found";
import {
  PasswordChangePage,
  ProfilePage,
  ServerErrorPage,
  SignUpPage,
  TempNavPage,
} from "./pages";
import { APP_PATH } from "./shared/constants";
import { getUrlPathName } from "./shared/utils";

const route = () => {
  const newPages: Record<string, Block> = {
    [APP_PATH.LOGIN]: SignInPage(),
    [APP_PATH.REGISTER]: SignUpPage(),
    [APP_PATH.NOT_FOUND]: NotFoundPage(),
    [APP_PATH.ERROR]: ServerErrorPage(),
    [APP_PATH.PROFILE]: ProfilePage(),
    [APP_PATH.CHANGE_PASSWORD]: PasswordChangePage(),
    [APP_PATH.NAV]: TempNavPage(),
  };

  const pages = Object.keys(newPages);
  const currentPath = getUrlPathName() || APP_PATH.NAV;
  const pageData = pages.includes(currentPath)
    ? newPages[currentPath as keyof typeof newPages]
    : newPages[APP_PATH.NOT_FOUND];

  render("#root", pageData);
};

document.addEventListener("DOMContentLoaded", () => {
  route();
});

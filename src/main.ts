import * as Widgets from "./shared/ui";
import * as Pages from "./pages";
import * as AuthProps from "./entities/auth/lib/constants/data";
import * as UserProps from "./entities/user/lib/constants/data";

import * as ChatUI from "./entities/chat/ui";
import * as UserUI from "./entities/user/ui";

import "./main.scss";
import Handlebars from "handlebars";
import { render } from "./shared/lib/dom/renderDom";
import { SignInPage } from "./pages/sign-in";
import { Block } from "./shared/lib/block";
import { NotFoundPage } from "./pages/not-found";
import { ServerErrorPage, SignUpPage } from "./pages";
import { APP_PATH } from "./shared/constants";
import { getUrlPathName } from "./shared/utils";


const pagesMap = {
  [APP_PATH.PROFILE]: {
    template: Pages.Profile,
    props: UserProps.ProfileProps,
  },
  [APP_PATH.PROFILE_EDIT]: {
    template: Pages.ProfileEdit,
    props: UserProps.ProfileProps,
  },
  [APP_PATH.CHANGE_PASSWORD]: {
    template: Pages.ProfileChangePassword,
    props: {},
  },
  [APP_PATH.CHANGE_AVATAR]: {
    template: Pages.ProfileChangeAvatar,
    props: {},
  },
  [APP_PATH.CHATS]: { template: Pages.Chats, props: {} },
  [APP_PATH.NAV]: { template: Pages.TempNav, props: {} },
};

const route  = () => {
  const newPages: Record<string, Block> = {
    [APP_PATH.LOGIN]: SignInPage(),
    [APP_PATH.REGISTER]: SignUpPage(),
    [APP_PATH.NOT_FOUND]: NotFoundPage(),
    [APP_PATH.ERROR]: ServerErrorPage(),

  }

  const pages = Object.keys(newPages);
  const currentPath = getUrlPathName() || APP_PATH.NAV;
  const pageData = pages.includes(currentPath)
    ? newPages[currentPath as keyof typeof newPages]
    : newPages[APP_PATH.NOT_FOUND];


  render('#root', pageData);
}

Object.entries({
  // ...Layouts,
  ...Widgets,
  ...UserUI,
  // ...AuthUI,
  ...ChatUI,
}).forEach(([name, component]) => {
  Handlebars.registerPartial(name, component);
});

document.addEventListener("DOMContentLoaded", () => {
  route()
});

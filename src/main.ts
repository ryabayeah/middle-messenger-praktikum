import * as Widgets from "./shared/ui";
import * as Pages from "./pages";
import * as AuthProps from "./entities/auth/lib/constants/data";
import * as UserProps from "./entities/user/lib/constants/data";

import * as ChatUI from "./entities/chat/ui";
import * as UserUI from "./entities/user/ui";

import "./main.scss";
import Handlebars from "handlebars";
import { render } from "./shared/lib/dom/renderDom";
import { HTTPTransport } from "./shared/lib/http-transport";
import { Inputt } from "./shared/ui/input/input";
import { SignInPage } from "./pages/sign-in";
import { Block } from "./shared/lib/block";
import { NotFoundPage } from "./pages/not-found";
import { ServerErrorPage, SignUpPage } from "./pages";


enum ROUTE {
  LOGIN= 'login',
  REGISTER= 'register',
  NOT_FOUND= '404',
  ERROR= '500',
  PROFILE= 'profile',
  PROFILE_EDIT= 'profile-edit',
  CHANGE_PASSWORD ='change-password',
  CHANGE_AVATAR= 'change-avatar',
  CHATS= 'chats',
  NAV= 'nav'

}

const pagesMap = {
  [ROUTE.LOGIN]: {
    template: Pages.Chats,
    props: AuthProps.SignInProps,
  },
  [ROUTE.REGISTER]: {
    template: Pages.SignUp,
    props: AuthProps.SignUpProps,
  },
  [ROUTE.NOT_FOUND]: {
    template: Pages.Chats,
    props: {},
  },
  [ROUTE.ERROR]: {
    template: Pages.Chats,
    props: {},
  },
  [ROUTE.PROFILE]: {
    template: Pages.Profile,
    props: UserProps.ProfileProps,
  },
  [ROUTE.PROFILE_EDIT]: {
    template: Pages.ProfileEdit,
    props: UserProps.ProfileProps,
  },
  [ROUTE.CHANGE_PASSWORD]: {
    template: Pages.ProfileChangePassword,
    props: {},
  },
  [ROUTE.CHANGE_AVATAR]: {
    template: Pages.ProfileChangeAvatar,
    props: {},
  },
  [ROUTE.CHATS]: { template: Pages.Chats, props: {} },
  [ROUTE.NAV]: { template: Pages.TempNav, props: {} },
};

const oldPagination  = () => {
  const pages = Object.keys(pagesMap);
  const currentPath = document.location.pathname.replace("/", "") || "nav";

  const pageData = pages.includes(currentPath)
    ? pagesMap[currentPath as keyof typeof pagesMap]
    : pagesMap["404"];
  const result = Handlebars.compile(pageData.template)(pageData.props);

  document.getElementById("root")!.innerHTML = result;
}

const pagination  = () => {
  const newPages: Record<string, Block> = {
    [ROUTE.LOGIN]: SignInPage(),
    [ROUTE.REGISTER]: SignUpPage(),

    [ROUTE.NOT_FOUND]: NotFoundPage(),
    [ROUTE.ERROR]: ServerErrorPage(),

  }

  const mock = new Inputt({
    id: "login",
    name: "login",
    type: "text",
    value: "login",
    label: "Логин",
})

  const pages = Object.keys(newPages);
  const currentPath = document.location.pathname.replace("/", "") || "nav";
  const pageData = pages.includes(currentPath)
    ? newPages[currentPath as keyof typeof newPages]
    : newPages[ROUTE.NOT_FOUND];


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
  // oldPagination()
  pagination()


  new HTTPTransport()
    .get("https://httpbin.org")
    .then((value) => console.log(value));

  //   const profile = new UserProfile({
  //   userName: 'John Doe',
  //   buttonText: 'Hello',
  //   loginInput: LoginInput,
  //   button: button,
  // });
  //  const SignInPage = new SignIn({
  //   inputLogin: new Inputt({
  //     id: "login",
  //     name: "login",
  //     type: "text",
  //     value: "login",
  //     label: "Логин",
  //   }),
  // });
    
  const loginInput  = new Inputt({
        id: "login",
        name: "login",
        type: "text",
        value: "login",
        label: "Логин",
  })
  const passwordInput  = new Inputt({
    id: "logfin",
    name: "lofgin",
    type: "tefxt",
    value: "lofgin",
    label: "Логfин",
  })
  // setTimeout(() => {
  //   // Обновляем кнопку
  //   button.setProps({ text: 'Updated text on button' });
  // }, 3000);

  // const signIn =  new SignInPage({
  //   loginInput: loginInput,
  //   passwordInput: passwordInput
  // })
  // render('#root', signIn);
});

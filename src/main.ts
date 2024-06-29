import * as Widgets from "./shared/ui";
import * as Pages from "./pages";
import * as Layouts from "./layouts";
import * as AuthProps from "./entities/auth/lib/constants/data";
import * as UserProps from "./entities/user/lib/constants/data";

import * as ChatUI from "./entities/chat/ui";
import * as UserUI from "./entities/user/ui";
import * as AuthUI from "./entities/auth/ui";

import "./main.scss";
import Handlebars from "handlebars";
import { render } from "./shared/lib/dom/renderDom";
import { HTTPTransport } from "./shared/lib/http-transport";
import { Inputt } from "./shared/ui/input/input";
import { signInPage } from "./pages/sign-in";
import { Block } from "./shared/lib/block";




const pagesMap = {
  login: {
    template: Pages.NotFound,
    props: AuthProps.SignInProps,
  },
  register: {
    template: Pages.SignUp,
    props: AuthProps.SignUpProps,
  },
  "404": {
    template: Pages.NotFound,
    props: {},
  },
  "500": {
    template: Pages.ServerError,
    props: {},
  },
  profile: {
    template: Pages.Profile,
    props: UserProps.ProfileProps,
  },
  "profile-edit": {
    template: Pages.ProfileEdit,
    props: UserProps.ProfileProps,
  },
  "change-password": {
    template: Pages.ProfileChangePassword,
    props: {},
  },
  "change-avatar": {
    template: Pages.ProfileChangeAvatar,
    props: {},
  },
  chats: { template: Pages.Chats, props: {} },
  nav: { template: Pages.TempNav, props: {} },
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
    login: signInPage()
  }

  const mock =   new Inputt({
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
    : mock;


  render('#root', pageData);
}

Object.entries({
  ...Layouts,
  ...Widgets,
  ...UserUI,
  ...AuthUI,
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

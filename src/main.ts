import * as Widgets from "./widgets";
import * as Pages from "./pages";
import * as Layouts from "./layouts";
import * as AuthProps from "./entities/auth/lib/constants/data";
import * as UserProps from "./entities/user/lib/constants/data";

import * as UserUI from "./entities/user/ui";
import * as AuthUI from "./entities/auth/ui";

import "./main.scss";
import Handlebars from "handlebars";

const pagesMap = {
  login: {
    template: Pages.SignIn,
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

Object.entries({ ...Layouts, ...Widgets, ...UserUI, ...AuthUI }).forEach(
  ([name, component]) => {
    Handlebars.registerPartial(name, component);
  }
);

document.addEventListener("DOMContentLoaded", () => {
  const pages = Object.keys(pagesMap);
  const currentPath = document.location.pathname.replace("/", "") || "nav";

  const pageData = pages.includes(currentPath)
    ? pagesMap[currentPath as keyof typeof pagesMap]
    : pagesMap["404"];
  const result = Handlebars.compile(pageData.template)(pageData.props);

  document.getElementById("root")!.innerHTML = result;
});

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
  register: { template: Pages.SignUp, props: AuthProps.SignUpProps },
  "404": { template: Pages.NotFound, props: {} },
  "500": { template: Pages.ServerError, props: {} },
  profile: { template: Pages.Profile, props: UserProps.ProfileProps },
  "profile-edit": {
    template: Pages.ProfileEdit,
    props: UserProps.ProfileProps,
  },
  "profile-change-password": {
    template: Pages.ProfileChangePassword,
    props: {},
  },
  "profile-change-avatar": {
    template: Pages.ProfileChangeAvatar,
    props: {},
  },
  chats: { template: Pages.Chats, props: {} },
};

Object.entries(Widgets).forEach(([name, component]) => {
  Handlebars.registerPartial(name, component);
});
Object.entries(Layouts).forEach(([name, component]) => {
  Handlebars.registerPartial(name, component);
});
Object.entries(UserUI).forEach(([name, component]) => {
  Handlebars.registerPartial(name, component);
});
Object.entries(AuthUI).forEach(([name, component]) => {
  Handlebars.registerPartial(name, component);
});

document.addEventListener("DOMContentLoaded", () => {
  const currentPath = document.location.pathname.replace("/", "") || "profile";
  const pages = Object.keys(pagesMap);
  const pageData = pages.includes(currentPath)
    ? pagesMap[currentPath as keyof typeof pagesMap]
    : pagesMap["404"];
  const result = Handlebars.compile(pageData.template)(pageData.props);

  document.getElementById("root")!.innerHTML = result;
});

import * as Widgets from "./widgets";
import * as Pages from "./pages";
import * as Layouts from "./layouts";

import * as UserUI from "./entities/user/ui";
import * as AuthUI from "./entities/auth/ui";

import "./main.scss";
import Handlebars from "handlebars";

const pagesMap = {
  "sign-in": { template: Pages.SignIn, props: {} },
  "sign-up": { template: Pages.SignUp, props: {} },
  "not-found": { template: Pages.NotFound, props: {} },
  "server-error": { template: Pages.ServerError, props: {} },
  "profile": { template: Pages.Profile, props: {} },
  "profile-edit": { template: Pages.ProfileEdit, props: {} },
  "profile-change-password": {
    template: Pages.ProfileChangePassword,
    props: {},
  },
  "profile-change-avatar": {
    template: Pages.ProfileChangeAvatar,
    props: {},
  },
  "chats": { template: '', props: {} },
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
  const currentPath = document.location.pathname.replace("/", "");
  const pages = Object.keys(pagesMap);
  const pageData = pages.includes(currentPath)
    ? pagesMap[currentPath as keyof typeof pagesMap]
    : pagesMap["not-found"];
  const result = Handlebars.compile(pageData.template)(pageData.props);
  document.getElementById("root")!.innerHTML = result;
});

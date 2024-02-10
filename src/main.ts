import * as Widgets from "./widgets";
import * as Pages from "./pages";
import * as Layouts from "./layouts";

import * as UserUI from "./entities/user/ui";
import * as AuthUI from "./entities/auth/ui";

import "./main.scss";
import Handlebars from "handlebars";

const pagesMap = {
  "sign-in": Pages.SignIn,
  "sign-up": Pages.SignUp,
  "not-found": Pages.NotFound,
  "server-error": Pages.ServerError,
  "profile": Pages.Profile,
  'profile-edit': Pages.ProfileEdit
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
  const result = Handlebars.compile(pagesMap['sign-in'])({})
  document.getElementById("root")!.innerHTML = result;
});

import mainLayout from "./layouts/main-layout";

import * as Widgets from './widgets';
import * as Pages from './pages';

import './main.scss'
import Handlebars from 'handlebars'

const pagesMap = {
  'sign-in': Pages.SignIn,
  'sign-up': Pages.SignUp,
}

Object.entries(Widgets).forEach(([ name, component ]) => {
  Handlebars.registerPartial(name, component);
});

document.addEventListener("DOMContentLoaded", () => {
  const result = mainLayout({
    page: pagesMap["sign-up"],
  });
  document.getElementById("root")!.innerHTML = result;
});
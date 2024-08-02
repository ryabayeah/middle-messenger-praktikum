import { APP_PATH } from '../constants';
import { Block } from './block';
import { Route } from './route';

export class Router {
  static __instance: Router;
  routes: Route[] = [];
  history: History = window.history;

  protected _currentRoute: Route | null = null;
  protected _rootQuery: string = '';

  constructor(rootQuery: string) {
    if (Router.__instance) {
      return Router.__instance;
    }

    this.routes = [];
    this._rootQuery = rootQuery;

    Router.__instance = this;
  }

  getCurrentRoutePath() {
    return this._currentRoute?.pathname || document.location.pathname
  }

  use(pathname: string, block: typeof Block) {
    const route = new Route(pathname, block, { rootQuery: this._rootQuery });
    this.routes.push(route);

    return this;
  }

  start() {
    window.onpopstate = (event: PopStateEvent) => {
      const target = event.currentTarget as Window;
      if (target) {
        this._onRoute(target.location.pathname);
      }
    };

    this._onRoute(window.location.pathname);
  }


  // init = async (pathname: string) => {
  //   // const currPath = router.getCurrentRoutePath()
  //   return await authController
  //     .getUser()
  //     .then(() => {
  //       if ([APP_PATH.LOGIN, APP_PATH.REGISTER].includes(pathname as APP_PATH)){
  //         this.go(APP_PATH.CHATS);
  //       }

  //     })
  //     .catch(() => {
  //       if (pathname !== APP_PATH.LOGIN) {
  //         this.go(APP_PATH.LOGIN);
  //       }
  //     });
  // };

  async _onRoute(pathname: string) {
    // this.init(pathname)
  
    const route = this.getRoute(pathname);

    if (!route) {
      return;
    }


    if (this._currentRoute) {
      this._currentRoute.leave();
    }

    this._currentRoute = route;
    route!.render();
  }

  go(pathname: string) {
    this.history.pushState({}, '', pathname);
    this._onRoute(pathname);
  }

  back() {
    this.history.back();
  }

  forward() {
    this.history.forward();
  }

  getRoute(pathname: string) {
    const route =  this.routes.find((route) => route.match(pathname));

    if (!route) {
      return this.routes.find((route) => route.match(APP_PATH.NOT_FOUND));
    }

    return route;
  }
}

export const router = new Router('#root');

import { authController } from '../../entities/user/controller';
import { User } from '../../entities/user/model';
import { APP_PATH } from '../constants';
import { store } from '../store/store';
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
    return this._currentRoute!.pathname
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

  async _onRoute(pathname: string) {
    const route = this.getRoute(pathname);

    if (!route) {
      return;
    }


    if (this._currentRoute) {
      this._currentRoute.leave();
    }

    this._currentRoute = route;

    // const isCanRender = await this.checkPage(pathname)
    // if (isCanRender){
      route!.render();
    // }
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

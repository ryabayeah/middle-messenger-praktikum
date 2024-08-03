import { isEqualString, render } from '../utils';
import { Block } from './block';

export class Route {
  protected _pathname: string;
  protected _blockClass: typeof Block;
  protected _block: Block | null;
  protected _props: { rootQuery: string };

  constructor(
    pathname: string,
    view: typeof Block,
    props: { rootQuery: string },
  ) {
    this._pathname = pathname;
    this._blockClass = view;
    this._block = null;
    this._props = props;
  }

  get pathname(){
    return this._pathname
  }

  navigate(pathname: string) {
    if (this.match(pathname)) {
      this._pathname = pathname;
      this.render();
    }
  }

  leave() {
    if (this._block) {
      this._block.hide();
    }
  }

  match(pathname: string) {
    return isEqualString(pathname, this._pathname);
  }

  render() {
    if (!this._block) {
      this._block = new this._blockClass({});
      render(this._props.rootQuery, this._block);
      return;
    }

    this._block.show();
  }
}

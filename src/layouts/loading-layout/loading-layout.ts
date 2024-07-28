import { Block } from '../../shared/lib';
import template from './loading-layout.hbs?raw';

export class LoadingLayout extends Block {
  constructor() {
    super({});
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}

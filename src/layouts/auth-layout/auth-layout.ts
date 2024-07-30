import { Block } from '../../shared/lib';
import template from './auth-layout.hbs?raw';
import './auth-layout.scss';

interface AuthLayoutProps extends CompileOptions {
  children: Block | Block[];
}

export class AuthLayout extends Block {
  constructor({ ...props }: AuthLayoutProps) {
    super({
      ...props,
    });
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}

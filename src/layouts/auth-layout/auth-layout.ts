import { Block } from "../../shared/lib/block";
import template from "./auth-layout.hbs?raw";

interface AuthLayoutProps extends CompileOptions {
  children: Block | Block[]
}

export class AuthLayout extends Block {
  constructor({...props }: AuthLayoutProps) {
    super({
      ...props,
    });
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}

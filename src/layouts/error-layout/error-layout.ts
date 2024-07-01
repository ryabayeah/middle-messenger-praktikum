import { Block } from "../../shared/lib/block";
import template from "./error-layout.hbs?raw";

interface ErrorLayoutProps extends CompileOptions {
  code: string;
  message: string;
  onSubmit?: (e: Event) => void;
}

export class ErrorLayout extends Block {
  constructor({ onSubmit, ...props }: ErrorLayoutProps) {
    super({
      ...props,
    });
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}

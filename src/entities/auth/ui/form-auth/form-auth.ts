import { Block } from "../../../../shared/lib/block/block";
import { Buttonn } from "../../../../shared/ui/button";
import { Inputt } from "../../../../shared/ui/input";
import template from "./form-auth.hbs?raw"

interface FormAuthProps extends CompileOptions {
  caption: string
  inputLogin?: Inputt;
  inputPassword?: Inputt;
  // children?: Record<string, Block>[]; // TODO: Продумать как это сделать
  children?: Block | Block[]; // TODO: Продумать как это сделать
  buttonSubmit: Buttonn
  buttonAlt: Buttonn
  onSubmit?: (e: Event) => void
}

export class FormAuth extends Block {
  constructor({onSubmit, ...props}: FormAuthProps) {
    super({
      ...props,
      events: {
        submit: (e: Event) => {
          e.preventDefault()
          onSubmit && onSubmit(e)
        }
      }
    });

  }

  render() {
    return this.compile(template, {...this.props});
  }
}

import { Block } from "../../../../shared/lib/block";
import { Buttonn } from "../../../../shared/ui/button";
import template from "./form-auth.hbs?raw"

interface FormAuthProps extends CompileOptions {
  caption: string
  children: Block | Block[];
  isInvalid?: boolean
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

import { Block } from '../../../../shared/lib/block';
import { Ref } from '../../../../shared/model/components';
import { Button } from '../../../../shared/ui/button';
import template from './form-auth.hbs?raw';
import  './form-auth.scss';


export interface FormAuthProps extends CompileOptions {
  caption: string;
  children: Block | Block[];
  isInvalid?: boolean;
  buttonSubmit: Button;
  buttonAlt: Button;
  refs?: Ref;
  onSubmit?: (e: Event) => void;
}

export class FormAuth extends Block {
  constructor({ onSubmit, ...props }: FormAuthProps) {
    super({
      ...props,
      events: {
        submit: (e: Event) => {
          e.preventDefault();
          onSubmit && onSubmit(e);
        },
      },
    });
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}

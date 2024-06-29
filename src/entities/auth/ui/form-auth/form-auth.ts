// import template from './form-auth.hbs?raw'
import { Block } from "../../../../shared/lib/block/block";
import { Buttonn } from "../../../../shared/ui/button";
import { Inputt } from "../../../../shared/ui/input";

interface FormAuthProps extends CompileOptions {
  caption: string
//   children: Block[] | Block; // TODO: Продумать как это сделать
  inputLogin?: Inputt;
  inputPassword?: Inputt;
  buttonSubmit: Buttonn
  buttonAlt: Buttonn
}

const template = `<form class="form-auth">
    <h2 class="form-auth__header">
        {{caption}}
    </h2>
    <div class="form-auth__content">
        {{{inputLogin}}}
        {{{inputPassword}}}
    </div>
    <div class="form-auth__buttons">
        {{{buttonSubmit}}}
        {{{buttonAlt}}}
    </div>
</form>`

export class FormAuth extends Block {
  constructor(props: FormAuthProps) {
    super({
      ...props,
    });

  }

  render() {
    return this.compile(template, {...this.props});
  }
}

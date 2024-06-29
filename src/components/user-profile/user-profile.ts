import { Block } from "../../shared/lib/block/block";
import { Inputt } from "../../shared/ui/input/input";
import { Button } from "../button/Button";

const profileTemplate = `
    <div>
    {{ userName }}
        {{{ loginInput }}}
    </div>
`;
interface UserProfileProps extends CompileOptions {
  userName: string;
  button: Button;
  buttonText: string;
  loginInput: Inputt;
}

export class UserProfile extends Block {
  constructor(props: UserProfileProps) {
    super({
      ...props,
    });

    // this.children.button = new Button({
    //     text: this.props.buttonText
    // });
  }

  // componentDidUpdate(oldProps: UserProfileProps, newProps: UserProfileProps) {
  //   if (oldProps.buttonText !== newProps.buttonText) {
  //     this.children.button.setProps({ text: newProps.buttonText });
  //   }

  //   return true;
  // }

  render() {
    return this.compile(profileTemplate, { ...this.props });
  }
}

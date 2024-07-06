import { Block } from "../../shared/lib";
import { Button } from "../../shared/ui/button";
import template from "./profile-layout.hbs?raw";

interface ProfileLayoutProps extends CompileOptions {
  backPath: string;
  body?: Block;
}

export class ProfileLayout extends Block {
  constructor(props: ProfileLayoutProps) {
    const backButton = new Button({
      variant: "secondary",
      text: "Назад",
      textPosition: "left",
      // TODO: Вынести в константы shared
      icon: `<svg width="13" height="12" viewBox="0 0 13 12" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <rect x="13" y="6.7998" width="11" height="1.6" transform="rotate(-180 13 6.7998)" fill="#3369F3" />
            <path d="M6 11L2 6L6 1" stroke="#3369F3" stroke-width="1.6" />
        </svg>`,
    });
    super({
      ...props,
      backButton,
    });
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}

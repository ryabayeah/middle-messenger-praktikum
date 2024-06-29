// components/button/Button.js

import { Block } from "../../shared/lib/block";
import { PropsAndChildren } from "../../shared/lib/block/block";
// Ваш реализованный шаблонизатор

const template = `
<div class="{{ className }}">
    {{ text }}
</div>
`;

export class Button extends Block {
  constructor(props: PropsAndChildren) {
    super({
        ...props,
        events: {
        //   click: (e: Event) => {
        //     if (props.onClick) {
        //       props.onClick(e);
        //     }
        //   },
        },
      });
  }

  render() {
    return this.compile(template, {...this.props});
  }
}

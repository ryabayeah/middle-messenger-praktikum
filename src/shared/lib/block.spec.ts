import { expect } from 'chai';
import Sinon from 'sinon';
import { Block } from './block';

describe('Smoke test for Components', () => {
  describe('Test block', () => {
    let blockClass: typeof Block;

    before(() => {
      class Button extends Block {
        // Для тестирования
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        constructor(props: {text: string}) {
          super({
            ...props,
          });
        }

        render() {
          return this.compile('<div id="div">{{text}}</div>', {});
        }
      }

      blockClass = Button;
    });

    // it('render props', () => {
    //   const textData = 'I am div!';
    //   const buttonComponent = new blockClass({ text: textData });
    //   const res = (buttonComponent.element as unknown as HTMLDivElement)
    //     ?.innerHTML;

    //   expect(res).to.be.eq(textData);
    // });

    it('handle click', () => {
      const handler = Sinon.stub();
      const buttonComponent = new blockClass({
        text: 'I am button!',
        events: { click: handler },
      });

      const event = new MouseEvent('click');
      (buttonComponent.element as unknown as HTMLDivElement)?.dispatchEvent(
        event,
      );

      expect(handler.calledOnce).to.be.true;
    });

    it('Invoke _render', () => {
      const buttonComponent = new blockClass({});

      const spyDCM = Sinon.spy(buttonComponent, '_render');

      buttonComponent.setProps({ text: 'bla' });

      expect(spyDCM.calledOnce).to.be.true;
    });
  });
});

import { APP_PATH } from '../../shared/constants';
import { Block } from '../../shared/lib';
import { Link } from '../../shared/ui';
import template from './temp-nav.hbs?raw';
import './temp-nav.scss';

const LINKS = [
  { href: APP_PATH.LOGIN, text: 'Логин' },
  { href: APP_PATH.REGISTER, text: 'Регистрация' },
  { href: APP_PATH.NOT_FOUND, text: '404' },
  { href: APP_PATH.ERROR, text: '500' },
  { href: APP_PATH.PROFILE, text: 'Профиль' },
  { href: APP_PATH.CHANGE_PASSWORD, text: 'Смена пароля' },
  { href: APP_PATH.CHATS, text: 'Чаты' },
];

class TempNav extends Block {
  constructor() {
    super({
      links: LINKS.map(
        (link) =>
          new Link({
            ...link,
          }),
      ),
    });
  }
  render() {
    return this.compile(template, { ...this.props });
  }
}

export const TempNavPage = () => new TempNav();

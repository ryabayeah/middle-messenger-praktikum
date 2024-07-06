import { Block } from '../../shared/lib';
import { Link } from '../../shared/ui';
import template from './temp-nav.hbs?raw';
import './temp-nav.scss';

const LINKS = [
  { href: '/login', text: 'Логин' },
  { href: '/register', text: 'Регистрация' },
  { href: '/404', text: '404' },
  { href: '/500', text: '500' },
  { href: '/profile', text: 'Профиль' },
  { href: '/profile-edit', text: 'Редактирование профиля' },
  { href: '/change-password', text: 'Смена пароля' },
  { href: '/change-avatar', text: 'Смена аватарки' },
  { href: '/chats', text: 'Чаты' },
];

class TempNav extends Block {
  constructor() {
    super({
      links: LINKS.map(
        link =>
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

import { ErrorLayout } from '../../layouts';
import { APP_PATH } from '../../shared/constants';

export class NotFoundPage extends ErrorLayout {
  constructor() {
    super({
      code: '404',
      message: 'Странно, но такой страницы не существует',
      backPath: APP_PATH.PROFILE,
      textBackPath: 'Вернуться',
    });
  }
}

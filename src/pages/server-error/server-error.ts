import { ErrorLayout } from '../../layouts';
import { APP_PATH } from '../../shared/constants';

export class ServerErrorPage extends ErrorLayout {
  constructor() {
    super({
      code: '500',
      message: 'Мы уже фиксим',
      backPath: APP_PATH.PROFILE,
      textBackPath: 'Вернуться',
    });
  }
}

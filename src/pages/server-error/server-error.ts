import { ErrorLayout } from '../../layouts';
import { APP_PATH } from '../../shared/constants';

export const ServerErrorPage = () =>
  new ErrorLayout({
    code: '500',
    message: 'Мы уже фиксим',
    backPath: APP_PATH.PROFILE,
    textBackPath: 'Вернуться',
  });

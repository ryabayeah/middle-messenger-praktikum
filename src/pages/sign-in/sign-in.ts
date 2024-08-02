import { UserSignInForm } from '../../entities/user/ui';
import { AuthLayout } from '../../layouts';

export class SignInPage extends AuthLayout {
  constructor() {
    const signInForm = new UserSignInForm();
    super({
      children: signInForm,
    });
  }
}

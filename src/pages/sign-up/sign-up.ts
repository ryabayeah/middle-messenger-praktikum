import { UserSignUpForm } from '../../entities/user/ui';
import { AuthLayout } from '../../layouts';

export class SignUpPage extends AuthLayout {
  constructor() {
    const signUpForm = new UserSignUpForm();

    super({
      children: signUpForm,
    });
  }
}

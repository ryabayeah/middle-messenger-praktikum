import { UserSignInForm } from "../../entities/user/ui/user-sign-in/user-sign-in";
import { AuthLayout } from "../../layouts";

export const SignInPage = () => {
  const signInForm = new UserSignInForm();

  return new AuthLayout({ children: signInForm });
};

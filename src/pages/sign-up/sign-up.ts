import { UserSignUpForm } from "../../entities/user/ui";
import { AuthLayout } from "../../layouts";

export const SignUpPage = () => {
  const signUpForm = new UserSignUpForm();

  return new AuthLayout({ children: signUpForm });
};

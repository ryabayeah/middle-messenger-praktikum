export type SignUpData = {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  phone: string;
  password: string;
};

export type SignInData = {
  login: string;
  password: string;
};

export type UpdateUserData = {
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
};

export type UpdateUserPasswordData = {
  oldPassword: string;
  newPassword: string;
};

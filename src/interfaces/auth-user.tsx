import { UserType } from './user';

export interface AuthUserType {
  jwt: string;
  user: UserType;
}

export interface PostAuthType {
  identifier: string;
  password: string;
}

export interface AuthResType {
  data: AuthUserType;
}

export interface PostResetPassType {
  password: string;
  passwordConfirmation  : string;
  code: string;
}

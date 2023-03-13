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
  error?: {
    status: number;
    name: string;
    message: string;
    details: any;
  };
  data: AuthUserType;
  status?:number;
  statusCode?:number;
}

export interface PostResetPassType {
  password: string;
  passwordConfirmation  : string;
  code: string;
}

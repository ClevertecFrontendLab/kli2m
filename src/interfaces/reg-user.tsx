import { AuthUserType } from './auth-user';

export interface RegUserType {
  firstName?: string;
  lastName?: string;
  username: string;
  email: string;
  password: string;
  phone: string;
}

export interface RegErrType {
  data: null;
  error: {
    status: number;
    name: string;
    message: string;
    details: any;
  };
}

export interface RegResType {
  data: AuthUserType
}

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
  error?: {
    status: number;
    name: string;
    message: string;
    details: any;
  };
  status?: number;
  statusCode?: number;

}

export interface RegResType {
  data: AuthUserType;
  status?: number;
  statusCode?: number;
  error?: {
    status: number;
    name: string;
    message: string;
    details: any;
  };
}

import { UserType } from './user';

export interface AuthUserType {
  jwt: string;
  user: UserType;
}

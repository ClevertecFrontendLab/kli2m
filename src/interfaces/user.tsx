export interface UserType {
  id: string;
  userId: string;
  commentUserId?: number;
  firstName?: string;
  lastName?: string;
  avatarUrl?: string;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: Date;
  updatedAt: Date;
  phone: string;
}

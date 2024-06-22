import { Profile } from '@prisma/client';
export type LoginRequest = {
  mobile: string;
  otp: string;
};

export type LoginResponse = {
  success: boolean;
  user: Profile;
  token: string;
};

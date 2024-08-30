import { Profile } from '@prisma/client';
export type LoginRequest = {
  mobile: string;
  otp: string;
};

export type LoginResponse = {
  success: boolean;
  data: {
    user: Profile;
    token: string;
  };
};

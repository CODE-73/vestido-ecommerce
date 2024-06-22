import { Profile } from '@prisma/client';
export type SignUpRequest = {
  firstName: string;
  lastName: string;
  mobile: string;
  otp: string;
};

export type SignUpResponse = {
  success: boolean;
  user: Profile;
  token: string;
};

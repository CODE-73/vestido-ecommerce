import { Profile } from '@prisma/client';
export type SignUpRequest = {
  firstName: string;
  lastName: string;
  mobile: string;
  otp: string;
  gender: string;
};

export type SignUpResponse = {
  success: boolean;
  data: {
    user: Profile;
    token: string;
  };
};

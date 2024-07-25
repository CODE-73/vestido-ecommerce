import { Profile } from '@prisma/client';

import { SignUpSchemaType } from './zod';

export type signupRequest = {
  data: SignUpSchemaType;
};

export type signupResponse = {
  data: Profile;
};

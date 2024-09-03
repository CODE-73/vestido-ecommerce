import { Profile } from '@prisma/client';

import { UpdateProfileSchemaType } from './zod';

export type UpdateProfileRequest = UpdateProfileSchemaType;
export type UpdateProfileResponse = { data: Profile };

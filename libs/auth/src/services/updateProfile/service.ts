import { getPrismaClient } from '@vestido-ecommerce/models';

import { UpdateProfileRequest } from './types';
import { UpdateProfileSchema } from './zod';

export async function updateProfile(
  profileId: string,
  data: UpdateProfileRequest,
) {
  const prisma = getPrismaClient();

  const validatedData = UpdateProfileSchema.parse(data);

  const user = await prisma.profile.update({
    where: {
      id: profileId,
    },
    data: {
      ...validatedData,
    },
  });

  return user;
}

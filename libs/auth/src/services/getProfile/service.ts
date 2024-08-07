import { getPrismaClient } from '@vestido-ecommerce/models';

export async function getProfile(profileId: string) {
  const prisma = getPrismaClient();

  // const validatedData = SendOtpSchema.parse(data);

  const user = await prisma.profile.findUnique({
    where: {
      id: profileId,
    },
  });

  return user;
}

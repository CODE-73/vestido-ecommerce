import { getPrismaClient } from '@vestido-ecommerce/models';

import { UpdateSettingsSchema, UpdateSettingsSchemaType } from './zod';

export async function updateSettings(data: UpdateSettingsSchemaType) {
  const prisma = getPrismaClient();

  const validatedData = UpdateSettingsSchema.parse(data);

  const updatedSettings = await prisma.settings.update({
    where: {
      key: data.key,
    },
    data: {
      ...data.value,
    },
  });
  return updatedSettings;
}

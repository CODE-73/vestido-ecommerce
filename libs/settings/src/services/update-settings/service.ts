import { getPrismaClient } from '@vestido-ecommerce/models';

import { UpdateSettingsSchema, UpdateSettingsSchemaType } from './zod';

export async function updateSettings(_data: UpdateSettingsSchemaType) {
  const prisma = getPrismaClient();

  const data = UpdateSettingsSchema.parse(_data);

  const updatedSettings = await prisma.settings.upsert({
    where: {
      key: data.key,
    },
    create: {
      key: data.key,
      value: data.value,
    },
    update: {
      value: data.value,
    },
  });
  return updatedSettings;
}

import { getPrismaClient } from '@vestido-ecommerce/models';

import { SettingsKeys } from '../../keys';
import { updateStorefrontData } from '../storefront-data/update-storefront-data';
import { UpdateSettingsSchema, UpdateSettingsSchemaType } from './zod';

export async function updateSettings(_data: UpdateSettingsSchemaType) {
  const prisma = getPrismaClient();

  const data = UpdateSettingsSchema.parse(_data);
  if (data.key == SettingsKeys.VESTIDO_HOME_DATA) {
    data.value = await updateStorefrontData(data.value);
  }

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

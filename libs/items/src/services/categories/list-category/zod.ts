import { Gender } from '@prisma/client';
import { z } from 'zod';

export const ListCategoryRequestSchema = z
  .object({
    q: z.string().nullish(),
    enabled: z.boolean().nullish(),
    gender: z.nativeEnum(Gender).nullish(),
  })
  .nullish();

export type ListCategoryRequestSchemaType = z.infer<
  typeof ListCategoryRequestSchema
>;

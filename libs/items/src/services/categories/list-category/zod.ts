import { Gender } from '@prisma/client';
import { z } from 'zod';

export const ListCategoryRequestSchema = z
  .object({
    q: z.string().nullish(),
    enabled: z.union([
      z.boolean().nullish(),
      z
        .string()
        .nullish()
        .transform((val) => {
          if (val === 'true') return true;
          if (val === 'false') return false;
          return undefined;
        }),
    ]),

    gender: z.nativeEnum(Gender).nullish(),
  })
  .nullish();

export type ListCategoryRequestSchemaType = z.infer<
  typeof ListCategoryRequestSchema
>;

import { z } from 'zod';

export const UpdateSettingsSchema = z.object({
  key: z.string(),
  value: z.record(z.any()).default({}),
});

export type UpdateSettingsSchemaType = z.infer<typeof UpdateSettingsSchema>;

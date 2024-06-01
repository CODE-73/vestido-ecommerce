import { z } from 'zod';

export const RequestSchema = z.object({
  requestType: z.union([z.literal('GET'), z.literal('UPLOAD')]),
  key: z.string().min(1),
  expiresIn: z.number().int().gt(0).default(3600),
});

export type BucketManagerArgs = z.infer<typeof RequestSchema>;

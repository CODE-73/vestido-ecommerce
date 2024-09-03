import { ProfileGender } from '@prisma/client';
import { z } from 'zod';
const indianMobileRegex = /^[6-9]\d{9}$/;

export const UpdateProfileSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  mobile: z
    .string()
    .regex(indianMobileRegex, 'Please enter a valid Indian mobile number'),

  gender: z.nativeEnum(ProfileGender).default('FEMALE' satisfies ProfileGender),
  email: z.string().email({
    message: 'Invalid email address',
  }),
});

export type UpdateProfileSchemaType = z.infer<typeof UpdateProfileSchema>;

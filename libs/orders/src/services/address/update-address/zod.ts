import { z } from 'zod';

const indianPostalCodeRegex = /^[1-9][0-9]{5}$/;

export const UpdateAddressSchema = z.object({
  customerId: z.string().uuid(),
  line1: z.string(),
  line2: z.string(),
  district: z.string(),
  state: z.string(),
  postalCode: z
    .string()
    .regex(indianPostalCodeRegex, 'Please enter a valid Indian postal code'),
});

export type UpdateAddressSchemaType = z.infer<typeof UpdateAddressSchema>;

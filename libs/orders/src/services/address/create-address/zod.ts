import { AddressType } from '@prisma/client';
import { z } from 'zod';

const indianPostalCodeRegex = /^[1-9][0-9]{5}$/;

export const CreateAddressSchema = z.object({
  customerId: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  mobile: z.string(),
  line1: z.string(),
  line2: z.string(),
  district: z.string(),
  state: z.string(),
  pinCode: z
    .string()
    .regex(indianPostalCodeRegex, 'Please enter a valid Indian postal code'),
  addressType: z.nativeEnum(AddressType).default('HOME' satisfies AddressType),
  default: z.boolean().default(true),
  archived: z.boolean().default(false),
});

export type CreateAddressSchemaType = z.infer<typeof CreateAddressSchema>;

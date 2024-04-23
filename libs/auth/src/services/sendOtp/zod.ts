import { z } from 'zod';

const indianMobileRegex = /^[6-9]\d{9}$/;

export const SendOtpSchema = z.object({
  mobile: z
    .string()
    .regex(indianMobileRegex, 'Please enter a valid Indian mobile number'),
});

export type SendOtpSchemaType = z.infer<typeof SendOtpSchema>;

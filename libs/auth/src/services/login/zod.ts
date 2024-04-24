import { z } from 'zod';

const indianMobileRegex = /^[6-9]\d{9}$/;

export const loginSchema = z.object({
  mobileNumber: z
    .string()
    .regex(indianMobileRegex, 'Please enter a valid Indian mobile number'),
  otp: z.string().refine((otp) => otp.length === 6, {
    message: 'OTP must be exactly 6 digits long',
    path: ['otp'],
  }),
});

export type loginSchemaType = z.infer<typeof loginSchema>;

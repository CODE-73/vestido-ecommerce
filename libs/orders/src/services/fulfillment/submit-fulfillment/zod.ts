import { z } from 'zod';

export const SubmitFulfillmentSchema = z.object({
  length: z.number().min(0.5, { message: 'Length must be greater than 0.5' }),
  breadth: z.number().min(0.5, { message: 'Breadth must be greater than 0.5' }),
  height: z.number().min(0.5, { message: 'Height must be greater than 0.5' }),
  weight: z.number().min(0.1, { message: 'Weight must be greater than 0' }),
  pickup_location: z.string(),
});

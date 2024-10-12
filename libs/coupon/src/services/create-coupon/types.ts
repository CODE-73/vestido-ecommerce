import { createCoupon } from './service';
import { CreateCouponSchemaType } from './zod';

export type CreateCouponArgs = CreateCouponSchemaType;
export type CreateCouponResult = Awaited<ReturnType<typeof createCoupon>>;

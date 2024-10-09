import { type updateCoupon } from './service';
import { UpdateCouponSchemaType } from './zod';

export type UpdateCouponArgs = UpdateCouponSchemaType;
export type UpdateCouponResult = Awaited<ReturnType<typeof updateCoupon>>;

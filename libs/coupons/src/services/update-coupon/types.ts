import { type updateCoupon } from './service';
import { UpdateCouponSchemaType } from './zod';

export type UpdateCouponArgs = UpdateCouponSchemaType & {
  couponId: string; // Add `couponId` as a required field
};
export type UpdateCouponResult = Awaited<ReturnType<typeof updateCoupon>>;

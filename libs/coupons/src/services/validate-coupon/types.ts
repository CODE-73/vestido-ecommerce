import { type validateCoupon } from './service';

export type ValidateCouponResult = Awaited<ReturnType<typeof validateCoupon>>;

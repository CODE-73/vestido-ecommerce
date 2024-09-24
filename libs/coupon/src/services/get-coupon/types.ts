import { type getCoupon } from './service';

// export type GetAttributeArgs = {};
export type GetCouponResult = Awaited<ReturnType<typeof getCoupon>>;

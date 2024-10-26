import { type getCouponByCode } from './service';

// export type GetAttributeArgs = {};
export type GetCouponByCodeResult = Awaited<ReturnType<typeof getCouponByCode>>;

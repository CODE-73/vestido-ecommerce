import { type getCouponsList } from './service';
import { ListCouponSchemaType } from './zod';

export type ListCouponArgs = ListCouponSchemaType;
export type ListCouponResult = Awaited<ReturnType<typeof getCouponsList>>;

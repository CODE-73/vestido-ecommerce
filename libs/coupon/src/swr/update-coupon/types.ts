import { VestidoResponse } from '@vestido-ecommerce/utils';

import {
  UpdateCouponResult,
  UpdateCouponSchemaType,
} from '../../services/update-coupon';

export type UpdateCouponRequest = UpdateCouponSchemaType & {
  couponId: string; // Add `couponId` as a required field
};

export type UpdateCouponResponse = VestidoResponse<UpdateCouponResult>;

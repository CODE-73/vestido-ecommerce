import { VestidoResponse } from '@vestido-ecommerce/utils';

import { CreateCouponSchemaType, GetCouponResult } from '../../services';
import { UpdateCouponSchemaType } from '../../services/update-coupon';

export type UpsertCouponRequest =
  | UpdateCouponSchemaType
  | CreateCouponSchemaType;

export type UpsertCouponResponse = VestidoResponse<GetCouponResult>;

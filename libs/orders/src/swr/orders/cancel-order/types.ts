import { VestidoResponse } from '@vestido-ecommerce/utils';

import {
  CancelOrderArgs,
  CancelOrderResult,
} from '../../../services/orders/cancel-order/types';

export type CancelOrderRequest = CancelOrderArgs;
export type CancelOrderResponse = VestidoResponse<CancelOrderResult>;

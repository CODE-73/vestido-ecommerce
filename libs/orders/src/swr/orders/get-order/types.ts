import { VestidoResponse } from '@vestido-ecommerce/utils';

import { type GetOrderResult } from '../../../services/orders/get-order';

export type GetOrderResponse = VestidoResponse<GetOrderResult>;

import { VestidoResponse } from '@vestido-ecommerce/utils';

import { getReturnOrder } from './service';

export type GetReturnOrderResponse =
  Awaited<ReturnType<typeof getReturnOrder>>;


export type GetReturnOrderSWRResponse = VestidoResponse<GetReturnOrderResponse>;

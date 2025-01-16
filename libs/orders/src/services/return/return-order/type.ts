import { VestidoResponse } from '@vestido-ecommerce/utils';

import { returnOrder } from './service';
import { returnOrderSchemaType } from './zod';

export type ReturnOrderRequest = returnOrderSchemaType;

export type ReturnOrderResponse = {
  data: Awaited<ReturnType<typeof returnOrder>>;
};

export type ReturnOrderSWRResponse = VestidoResponse<ReturnOrderResponse>;

import { VestidoResponse } from '@vestido-ecommerce/utils';

import { returnOrder } from './service';
import { ReturnOrderSchemaType } from './zod';

export type ReturnOrderRequest = ReturnOrderSchemaType;

export type ReturnOrderResponse = {
  data: Awaited<ReturnType<typeof returnOrder>>;
};

export type ReturnOrderSWRResponse = VestidoResponse<ReturnOrderResponse>;

import { Return } from '@prisma/client';

import { VestidoResponse } from '@vestido-ecommerce/utils';

export type ListReturnOrderResponse = {
  data: Return[];
};

export type ListReturnOrderSWRResponse =
  VestidoResponse<ListReturnOrderResponse>;

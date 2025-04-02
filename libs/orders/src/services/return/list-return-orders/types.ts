import { Return } from '@prisma/client';

import { VestidoResponse } from '@vestido-ecommerce/utils';

export type ListReturnOrderResult = {
  data: Return[];
};

export type ListReturnOrderResponse = VestidoResponse<ListReturnOrderResult>;

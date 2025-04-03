import { Return } from '@prisma/client';

import { VestidoResponse } from '@vestido-ecommerce/utils';

export type ListReturnOrderResult = Return[];

export type ListReturnOrderResponse = VestidoResponse<ListReturnOrderResult>;

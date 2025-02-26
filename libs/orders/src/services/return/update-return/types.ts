import { VestidoResponse } from '@vestido-ecommerce/utils';

import { updateReturnOrder } from './service';
import { UpdateReturnSchemaType } from './zod';

export type UpdateReturnRequest = UpdateReturnSchemaType;

export type UpdateReturnResponse = {
  data: Awaited<ReturnType<typeof updateReturnOrder>>;
};

export type UpdateReturnSWRResponse = VestidoResponse<UpdateReturnResponse>;

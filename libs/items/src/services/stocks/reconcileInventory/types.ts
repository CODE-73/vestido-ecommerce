import { Item } from '@prisma/client';

import { VestidoResponse } from '@vestido-ecommerce/utils';

import { stockUpdateSchemaType } from './zod';

export type stockUpdateRequest = stockUpdateSchemaType;

export type stockUpdateResponse = {
  data: Item;
};

export type stockUpdateSWRResponse = VestidoResponse<stockUpdateResponse>;

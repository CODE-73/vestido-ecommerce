import { Return } from '@prisma/client';

import { VestidoResponse } from '@vestido-ecommerce/utils';

import { ListReturnSchemaType } from './zod';

export type ListReturnOrderResult = Return[];

export type ListReturnOrderResponse = VestidoResponse<ListReturnOrderResult>;

export type ListReturnOrderRequest = ListReturnSchemaType;

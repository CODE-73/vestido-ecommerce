import { VestidoResponse } from '@vestido-ecommerce/utils';
import { UpdateOrderResults } from 'libs/orders/src/services/orders/update-order/types';
import { UpdateOrderSchemaType } from 'libs/orders/src/services/orders/update-order/zod';

export type UpdateOrderRequest = UpdateOrderSchemaType;
export type UpdateOrderResponse = VestidoResponse<UpdateOrderResults>;

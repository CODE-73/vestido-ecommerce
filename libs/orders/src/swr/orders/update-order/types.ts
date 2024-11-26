import { VestidoResponse } from '@vestido-ecommerce/utils';

import { UpdateOrderResults } from '../../../services/orders/update-order/types';
import { UpdateOrderSchemaType } from '../../../services/orders/update-order/zod';

export type UpdateOrderRequest = UpdateOrderSchemaType;
export type UpdateOrderResponse = VestidoResponse<UpdateOrderResults>;

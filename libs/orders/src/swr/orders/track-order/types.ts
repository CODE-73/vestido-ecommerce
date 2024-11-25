import { VestidoResponse } from '@vestido-ecommerce/utils';
import { trackOrderResult } from 'libs/orders/src/services';

export type trackOrderResponse = VestidoResponse<trackOrderResult>;

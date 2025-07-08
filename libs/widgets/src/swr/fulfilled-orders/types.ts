import { VestidoResponse } from '@vestido-ecommerce/utils';

import { type FulfilledOrdersResult } from '../../services/fulfilled-orders-count/types';

export type FulfilledOrdersResponse = VestidoResponse<FulfilledOrdersResult>;

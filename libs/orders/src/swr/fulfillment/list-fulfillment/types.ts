import { VestidoResponse } from '@vestido-ecommerce/utils';

import { type ListFulfillmentResult } from '../../../services/fulfillment/list-fulfillment';

export type FulfillmentListResponse = VestidoResponse<ListFulfillmentResult>;

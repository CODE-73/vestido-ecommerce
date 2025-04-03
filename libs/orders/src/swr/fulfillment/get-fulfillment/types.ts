import { VestidoResponse } from '@vestido-ecommerce/utils';

import { type FulfillmentDetailsResult } from '../../../services/fulfillment/get-fulfillment';

export type FulfillmentDetailsResponse =
  VestidoResponse<FulfillmentDetailsResult>;

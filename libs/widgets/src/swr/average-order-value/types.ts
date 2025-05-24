import { VestidoResponse } from '@vestido-ecommerce/utils';

import { type AverageOrderValueResult } from '../../services/average-order-value/types';

export type AverageOrderValueResponse =
  VestidoResponse<AverageOrderValueResult>;

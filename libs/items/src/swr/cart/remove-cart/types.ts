import { VestidoResponse } from '@vestido-ecommerce/utils';

import {
  RemoveFromCartArgs,
  RemoveFromCartResult,
} from '../../../services/cart/remove-from-cart/types';

export type RemoveFromCartRequest = Omit<RemoveFromCartArgs, 'customerId'>;

export type RemoveFromCartResponse = VestidoResponse<RemoveFromCartResult>;

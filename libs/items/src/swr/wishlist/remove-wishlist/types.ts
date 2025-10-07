import { VestidoResponse } from '@vestido-ecommerce/utils';

import {
  RemoveFromWishlistArgs,
  RemoveFromWishlistResult,
} from '../../../services';

export type RemoveFromWishlistRequest = Omit<
  RemoveFromWishlistArgs,
  'customerId'
>;
export type RemoveFromWishlistResponse =
  VestidoResponse<RemoveFromWishlistResult>;

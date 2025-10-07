import { VestidoResponse } from '@vestido-ecommerce/utils';

import { AddToCartArgs, AddToCartResult } from '../../../services';

// export type AddCartRequest = Omit<
//   CartItem,
//   'id' | 'customerId' | 'createdAt' | 'updatedAt'
// >;

export type AddToCartRequest = AddToCartArgs;
export type AddToCartResponse = VestidoResponse<AddToCartResult>;

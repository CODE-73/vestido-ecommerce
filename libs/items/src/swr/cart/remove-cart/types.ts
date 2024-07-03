import { RemoveFromCartRequest } from '../../../services/cart/remove-from-cart/types';

export type RemoveFromCartSWRRequest = Omit<
  RemoveFromCartRequest,
  'customerId'
>;

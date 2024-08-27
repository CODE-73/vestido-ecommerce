import useSWRImmutable from 'swr/immutable';

import { useAuth } from '@vestido-ecommerce/auth/client';

import {
  shippingChargesRequest,
  shippingChargesResponse,
} from '../../../services/shipping/get-shipping-charge/types';
import { ShippingDetailsSWRKeys } from '../keys';
import { getShipping } from './service';

export function useShippingCharges(args: shippingChargesRequest) {
  const { isAuthenticated, authHeaders } = useAuth();
  const key = isAuthenticated
    ? [
        ShippingDetailsSWRKeys.SHIPPING,
        ShippingDetailsSWRKeys.DETAILS,
        args.paymentType,
        args.shippingAddressId,
      ]
    : null;

  return useSWRImmutable<shippingChargesResponse, Error>(
    key,
    () => getShipping(args, authHeaders),
    {
      keepPreviousData: true,
    },
  );
}

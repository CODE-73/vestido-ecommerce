import useSWRImmutable from 'swr/immutable';

import { useAuth } from '@vestido-ecommerce/auth/client';

import {
  shippingChargesRequest,
  shippingChargesResponse,
} from '../../../services/shipping/get-shipping-charge/types';
import { ShippingDetailsSWRKeys } from '../keys';
import { getShipping } from './service';

export function useShippingCharges(args: shippingChargesRequest) {
  const { authHeaders } = useAuth();
  const key = [
    ShippingDetailsSWRKeys.SHIPPING,
    ShippingDetailsSWRKeys.DETAILS,
    args.paymentType,
    args.shippingAddressId,
  ];

  return useSWRImmutable<shippingChargesResponse, Error>(
    key,
    () => getShipping(args, authHeaders),
    {
      keepPreviousData: true,
    },
  );
}

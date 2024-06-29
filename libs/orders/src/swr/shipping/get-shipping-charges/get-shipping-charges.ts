import useSWRImmutable from 'swr/immutable';
import {
  shippingChargesRequest,
  shippingChargesResponse,
} from '../../../services/shipping/get-shipping-charge/types';
import { useAuth } from '@vestido-ecommerce/auth';
import { getShipping } from './service';
import { ShippingDetailsSWRKeys } from '../keys';

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
    }
  );
}

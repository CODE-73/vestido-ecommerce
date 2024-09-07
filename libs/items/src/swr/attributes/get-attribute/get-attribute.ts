import useSWRImmutable from 'swr/immutable';

import { useAuth } from '@vestido-ecommerce/auth/client';

import { AttributeDetailsResponse } from '../../../services/attributes/get-attribute/types';
import { AttributeDetailsSWRKeys } from '../keys';
import { getAttributeDetails } from './service';

export function useAttribute(attributeId?: string | null) {
  const { authHeaders } = useAuth();
  const key = attributeId
    ? [
        AttributeDetailsSWRKeys.ATTRIBUTE,
        AttributeDetailsSWRKeys.DETAILS,
        attributeId,
      ]
    : null;

  return useSWRImmutable<AttributeDetailsResponse, Error>(
    key,
    () => getAttributeDetails(attributeId as string, authHeaders),
    {
      keepPreviousData: true,
    },
  );
}

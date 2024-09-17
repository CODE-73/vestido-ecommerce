import useSWRImmutable from 'swr/immutable';

import { useAuth } from '@vestido-ecommerce/auth/client';

import { AttributeDetailsSWRKeys } from '../keys';
import { getAttribute } from './service';
import { GetAttributeResponse } from './types';

export function useAttribute(attributeId?: string | null) {
  const { authHeaders } = useAuth();
  const key = attributeId
    ? [
        AttributeDetailsSWRKeys.ATTRIBUTE,
        AttributeDetailsSWRKeys.DETAILS,
        attributeId,
      ]
    : null;

  return useSWRImmutable<GetAttributeResponse, Error>(
    key,
    () => getAttribute(attributeId as string, authHeaders),
    {
      keepPreviousData: true,
    },
  );
}

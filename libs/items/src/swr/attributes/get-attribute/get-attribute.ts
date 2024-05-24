import useSWRImmutable from 'swr/immutable';
import { AttributeDetailsResponse } from '../../../services/attributes/get-attribute/types';
import { getAttributeDetails } from './service';
import { AttributeDetailsSWRKeys } from '../keys';

export function useAttribute(attributeId?: string | null) {
  const key = attributeId
    ? [
        AttributeDetailsSWRKeys.ATTRIBUTE,
        AttributeDetailsSWRKeys.DETAILS,
        attributeId,
      ]
    : null;

  return useSWRImmutable<AttributeDetailsResponse, Error>(
    key,
    () => getAttributeDetails(attributeId as string),
    {
      keepPreviousData: true,
    }
  );
}

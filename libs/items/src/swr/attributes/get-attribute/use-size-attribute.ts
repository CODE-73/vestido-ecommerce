import { useVariant } from '../../variants';
import { useAttributes } from '../list-attributes';

export function useSizeAttribute(
  itemId?: string | null,
  variantId?: string | null,
) {
  const { data } = useAttributes();
  const { data: variant } = useVariant(itemId as string, variantId);

  const sizeAttribute = data?.data?.find((x) => x.name == 'Size');

  const variantSize = sizeAttribute?.values.find(
    (x) => x.id === variant?.data.attributeValues[0].attributeValueId,
  )?.value;

  return { sizeAttribute, variantSize };
}

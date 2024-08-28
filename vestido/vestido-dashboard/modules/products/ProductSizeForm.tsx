/**
 * 1. Fetch all Attributes from the database.
 * 2. Identify the Size Attribute
 * 3. Loop through all available sizes
 */

import { useAttributes } from '@vestido-ecommerce/items/client';

const ProductSizeForm = () => {
  const { data: { data: attributes } = { data: null } } = useAttributes();

  if (!attributes) {
    return null;
  }

  const sizeAttribute = attributes.find(
    (attribute) => attribute.name.toLowerCase() === 'size',
  );

  if (!sizeAttribute) {
    return null;
  }

  return (
    <div>
      {sizeAttribute.ItemAttributeValues.map((size, index) => (
        <div key={index}>{size.value}</div>
      ))}
    </div>
  );
};

export default ProductSizeForm;

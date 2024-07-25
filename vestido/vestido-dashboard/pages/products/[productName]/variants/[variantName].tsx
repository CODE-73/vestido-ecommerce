import { useRouter } from 'next/router';

import { NextPage } from 'next';

import VariantDetailsView from '../../../../modules/variants/VariantForm';

const VariantDetails: NextPage = () => {
  const router = useRouter();
  const variantId = router.query.variantName;
  const itemId = router.query.productName;

  if (!variantId || !itemId) {
    return null;
  }

  return (
    <VariantDetailsView
      isNew={variantId === 'add-new'}
      itemId={itemId as string}
      variantId={variantId as string}
    />
  );
};

export default VariantDetails;

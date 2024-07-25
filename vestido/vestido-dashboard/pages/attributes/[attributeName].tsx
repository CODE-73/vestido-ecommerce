import { useRouter } from 'next/router';

import { NextPage } from 'next';

import AttributeDetailsView from '../../modules/itemAttribute/ItemAttributeForm';

const CategoryDetails: NextPage = () => {
  const router = useRouter();
  const attributeId = router.query.attributeName;

  return (
    <AttributeDetailsView
      isNew={attributeId === 'add-new'}
      itemAttributeId={attributeId as string}
    />
  );
};

export default CategoryDetails;

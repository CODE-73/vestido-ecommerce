import { useRouter } from 'next/router';

import { NextPage } from 'next';

import GetFulfillment from '../../../modules/fulfillments/FulfillmentForm';

const UpdateFulfillment: NextPage = () => {
  const router = useRouter();
  const fulfillmentId = router.query.fulfillmentName;

  return <GetFulfillment fulfillmentId={fulfillmentId as string} />;
};

export default UpdateFulfillment;

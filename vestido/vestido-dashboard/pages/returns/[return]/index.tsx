import { useRouter } from 'next/router';

import { NextPage } from 'next';

import ReturnDetails from '../../../modules/returns/return-details';

const ReturnDetailsPage: NextPage = () => {
  const router = useRouter();
  const returnId = router.query.return;

  return <ReturnDetails returnId={returnId as string} />;
};

export default ReturnDetailsPage;

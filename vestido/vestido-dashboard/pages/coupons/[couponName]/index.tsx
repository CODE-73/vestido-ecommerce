import { useRouter } from 'next/router';

import { NextPage } from 'next';

import CouponDetailsView from '../../../modules/coupons/coupon-form';

const CouponDetails: NextPage = () => {
  const router = useRouter();
  const couponId = router.query.couponName;

  const isNew = couponId === 'add-new';

  return (
    <CouponDetailsView
      isNew={isNew}
      couponId={isNew ? null : (couponId as string)}
    />
  );
};

export default CouponDetails;

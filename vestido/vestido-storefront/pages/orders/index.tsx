import { NextPage } from 'next';
import { SWRConfig } from 'swr';

// import { ensureSerializable } from '@vestido-ecommerce/utils';
import OrderListView from '../../modules/user/Orders';

type AllOrdersPageProps = {
  fallback: Record<string, unknown>;
};

const AllOrdersPage: NextPage<AllOrdersPageProps> = ({ fallback }) => {
  return (
    <SWRConfig value={{ fallback }}>
      <OrderListView />;
    </SWRConfig>
  );
};

// const { data } = useProfile();
// const currentUserId = data?.data.id;

// export async function getStaticProps(currentUserId) {

//     const orders = await listOrder(currentUserId ?? '');

//     return {
//         props: {
//             fallback: {
//                 // useItems({ })
//                 [unstable_serialize([
//                     OrderSWRKeys.ORDER,
//                     OrderSWRKeys.LIST,
//                     JSON.stringify({}),
//                 ])]: orders,
//             },
//         },
//         revalidate: 10,
//     };
// }

export default AllOrdersPage;

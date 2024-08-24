import { NextPage } from 'next';

import { listItem, ListItemResponse } from '@vestido-ecommerce/items';

import HomePage from '../modules/HomePage/HomePage';

type ItemsListProps = {
  items: NonNullable<ListItemResponse>;
};

const Home: NextPage<ItemsListProps> = ({ items }) => {
  return <HomePage items={items} />;
};

export default Home;

export async function getStaticProps() {
  const items = await listItem(null);

  return { props: { items }, revalidate: 30 };
}

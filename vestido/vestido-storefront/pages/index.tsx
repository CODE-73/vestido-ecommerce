import { NextPage } from 'next';
import { SWRConfig, unstable_serialize } from 'swr';

import { listItem, ListItemResponse } from '@vestido-ecommerce/items';
import { getSettings, SettingsKeys } from '@vestido-ecommerce/settings';
import { SettingsSWRKeys } from '@vestido-ecommerce/settings/client';
import { ensureSerializable } from '@vestido-ecommerce/utils';

import HomePage from '../modules/HomePage/HomePage';

type ItemsListProps = {
  items: NonNullable<ListItemResponse>;
  fallback: Record<string, unknown>;
};

const Home: NextPage<ItemsListProps> = ({ items, fallback }) => {
  return (
    <SWRConfig value={{ fallback }}>
      <HomePage items={items} />
    </SWRConfig>
  );
};

export default Home;

export async function getStaticProps() {
  const items = ensureSerializable(await listItem(null));
  const home_data = await getSettings('VESTIDO_HOME_DATA');

  return {
    props: {
      items,
      fallback: {
        [unstable_serialize([
          SettingsSWRKeys.SETTINGS,
          SettingsSWRKeys.DETAILS,
          SettingsKeys.VESTIDO_HOME_DATA,
        ])]: { data: home_data, success: true },
      },
    },
    revalidate: 30,
  };
}

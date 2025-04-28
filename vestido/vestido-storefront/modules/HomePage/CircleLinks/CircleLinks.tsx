import { FC } from 'react';

import { useVestidoHomeData } from '@vestido-ecommerce/settings/client';

import CircleLink from './CircleLink';

export const CircleLinks: FC = () => {
  const home_data = useVestidoHomeData();
  const circle_links = home_data?.circle_links;

  return (
    <div className="w-full lg:w-auto overflow-x-auto no-scrollbar pt-4 mt-6 sm:mt-auto sm:pt-4 sm:pb-5 lg:pb-auto lg:pt-10">
      <div className="flex space-x-4 lg:space-x-2 px-4 lg:justify-center">
        {circle_links?.map((card, index) => (
          <CircleLink key={index} data={card} />
        ))}
      </div>
    </div>
  );
};

import { Item } from '@prisma/client';
import { LuCheckCircle, LuX } from 'react-icons/lu';

import ItemImage from './item-image';

export const ItemToastBody = (
  tick: boolean,
  item: Item,
  message?: string,
): JSX.Element => {
  return (
    <>
      <div className="flex font-semibold text-xl items-center gap-2 mb-3">
        {tick ? (
          <LuCheckCircle className="text-green-500" strokeWidth={3} />
        ) : (
          <LuX className="text-red-500" strokeWidth={3} />
        )}

        <span>{message ?? ''}</span>
      </div>
      <div className="flex items-center gap-3">
        <ItemImage
          item={item}
          width={10}
          height={10}
          className="rounded-full w-10 h-10"
        />
        <div>
          <p className="font-semibold">{item.title ?? ''}</p>
          <p className="text-sm text-gray-500 max-w-full truncate text-ellipsis overflow-hidden">
            {item.description ?? ''}
          </p>
        </div>
      </div>
    </>
  );
};

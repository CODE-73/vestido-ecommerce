import { ImageSchemaType } from '@vestido-ecommerce/utils';
import Image from 'next/image';
import { LuCheckCircle, LuX } from 'react-icons/lu';
import * as React from 'react';

export const toastDescription = (
  tick: boolean,
  title?: string,
  description?: string,
  message?: string,
  imageSrc?: string,
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
        <Image
          src={imageSrc ?? ''}
          alt="Product Thumbnail"
          className="rounded-full w-10 h-10"
          width={10}
          height={10}
        />
        <div>
          <p className="font-semibold">{title ?? ''}</p>
          <p className="text-sm text-gray-500 max-w-full truncate text-ellipsis overflow-hidden">
            {description ?? ''}
          </p>
        </div>
      </div>
    </>
  );
};

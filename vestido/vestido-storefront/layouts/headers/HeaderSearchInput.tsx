import { CSSProperties, FC } from 'react';

import clsx from 'clsx';
import { LuSearch, LuX } from 'react-icons/lu';
import { twMerge } from 'tailwind-merge';

import { Input } from '@vestido-ecommerce/shadcn-ui/input';

type HeaderSearchInputProps = {
  className?: string;
  containerClassName?: string;
  iconSize?: number;
  onCancelClick?: () => void;
};

export const HeaderSearchInput: FC<HeaderSearchInputProps> = ({
  className,
  containerClassName,
  onCancelClick,
  iconSize = 24,
}) => {
  return (
    <div
      className={twMerge(
        clsx(
          'relative border border-input border-slate-300 px-2',
          'flex items-center justify-items-center content-center gap-4',
          containerClassName,
        ),
      )}
    >
      <Input
        name="search-products"
        placeholder="Search Products..."
        type="search"
        style={
          {
            // TODO: Change this to a tailwind class
            '--tw-ring-inset': 0,
          } as CSSProperties
        }
        className={clsx(
          'rounded-none max-w-28 bg-transparent',
          'border-none px-0',
          className,
        )}
      />
      {onCancelClick && (
        <div
          className="text-slate-400 hover:text-[#48cab2]"
          onClick={onCancelClick}
        >
          <LuX size={iconSize} />
        </div>
      )}
      <LuSearch
        className="text-slate-400 hover:text-[#48cab2]"
        size={iconSize}
      />
    </div>
  );
};

import { FC, useMemo } from 'react';
import { useRouter } from 'next/router';

import clsx from 'clsx';
import { LuX } from 'react-icons/lu';
import { twMerge } from 'tailwind-merge';

import { useCategories } from '@vestido-ecommerce/items/client';
import { Combobox } from '@vestido-ecommerce/shadcn-ui/combobox';
import { slugify } from '@vestido-ecommerce/utils';

type HeaderSearchInputProps = {
  className?: string;
  containerClassName?: string;
  iconSize?: number;
  onCancelClick?: () => void;
  setSearchOpen?: React.Dispatch<React.SetStateAction<boolean>>;
};

export const HeaderSearchInput: FC<HeaderSearchInputProps> = ({
  className,
  containerClassName,
  onCancelClick,
  iconSize,
  setSearchOpen,
}) => {
  const router = useRouter();
  const { data: categories, isLoading } = useCategories();
  const options = useMemo(
    () =>
      categories?.data?.flatMap((category) => [
        ...(category.slug
          ? [
              {
                label: category.name,
                value: category.slug,
              },
            ]
          : []),
        ...category.searchTerms.map((term) => ({
          label: term,
          value: slugify(term),
        })),
      ]) ?? [],
    [categories],
  );

  const onSelect = (value: string) => {
    router.push(`/${encodeURIComponent(value)}`);
  };

  return (
    <div
      className={twMerge(
        clsx(
          'relative border border-input border-slate-300 px-2',
          'flex items-center justify-items-center content-center gap-4 rounded-full',
          containerClassName,
        ),
      )}
    >
      <Combobox
        value={null}
        disabled={isLoading}
        options={options}
        placeholder="Search"
        shouldFilter
        noOptionsText="Try something else?"
        onChange={onSelect}
        className={clsx(
          'rounded-none max-w-28 bg-transparent hover:bg-transparent hover:text-auto',
          'border-none px-0',
          className,
        )}
      />
      {onCancelClick && (
        <div className="text-slate-400 cursor-pointer" onClick={onCancelClick}>
          <LuX
            size={iconSize}
            onClick={() => setSearchOpen && setSearchOpen(false)}
          />
        </div>
      )}
    </div>
  );
};

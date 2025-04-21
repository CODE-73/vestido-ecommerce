import { useRouter } from 'next/router';
import { FC, useEffect, useMemo, useState } from 'react';

import clsx from 'clsx';
import { LuCheck, LuX } from 'react-icons/lu';
import { twMerge } from 'tailwind-merge';

import { Popover, PopoverAnchor, PopoverContent } from '@vestido-ecommerce/shadcn-ui/popover';
import { useCategories } from '@vestido-ecommerce/items/client';
import { ComboboxOption } from '@vestido-ecommerce/shadcn-ui/combobox';
import { slugify } from '@vestido-ecommerce/utils';
import { CommandEmpty, CommandGroup, CommandItem } from '@vestido-ecommerce/shadcn-ui/command';
import { Command as CommandPrimitive } from 'cmdk';

import { cn } from 'libs/shadcn-ui/src/utils';
import React from 'react';

type HeaderSearchInputProps = {
  className?: string;
  containerClassName?: string;
  iconSize?: number;
  onChange?: (value: string) => void;
  onCancelClick?: () => void;
  setSearchOpen: React.Dispatch<React.SetStateAction<boolean>>;
  searchOpen?: boolean;
  shouldFilter?: boolean
  value?: string | null
  nullable?: boolean;
  multiple?: boolean;
  values?: string[];
  onSearch?: (value: string) => void;
};

export const HeaderSearchInput: FC<HeaderSearchInputProps> = ({
  className,
  containerClassName,
  onCancelClick,
  iconSize,
  setSearchOpen,
  searchOpen,
  onChange,
  value,
  values = [],
  onSearch
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

  const [prevSelection, setPrevSelection] = useState<ComboboxOption | null>(
    null,
  );

  useEffect(() => {
    // Clear Selection if value got changed from outside
    if (prevSelection && value !== prevSelection.value) {
      setPrevSelection(null);
    }
  }, [value, prevSelection]);

  const [open, setOpen] = useState(false);
  console.log({
    searchOpen, open
  })


  return (
    <div
      className={twMerge(
        clsx(
          'relative border border-bottom border-slate-300 px-2',
          'flex items-center justify-items-center content-center rounded-md my-2 bg-black' ,
          containerClassName,
        ),
      )}
    >
      <div className='min-w-full'>
      <Popover open={open} >
        <CommandPrimitive shouldFilter={true} className="min-w-full md:min-w-[500px] min-h-[30px]">
          <PopoverAnchor className='bg-white'>
            <CommandInput
              autoFocus
              onFocus={() => {
                setOpen(true)
              }}
              onValueChange={(search) => {
                onSearch?.(search);
              }}
              placeholder="Search"
              className=' min-h-[40px] ml-5 bg-black border-none focus:border-none text-white'
            />
          </PopoverAnchor>
          <PopoverContent className="min-w-full md:min-w-[500px] p-0 font-primary">
            <CommandEmpty>{'Nothing matches your search!'}</CommandEmpty>
            <CommandGroup className="max-h-[15rem] overflow-y-auto">
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  onSelect={() => {
                    setPrevSelection(option);
                    onChange?.(option.value);
                    setOpen(false);
                    setTimeout(() => onSearch?.(''));
                  }}
                  className="font-bold"
                >
                  <LuCheck
                    className={cn(
                      'me-2 h-4 w-4 opacity-0',
                      value === option.value && 'opacity-100',
                    )}
                  />
                  {option.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </PopoverContent>
        </CommandPrimitive>
      </Popover>
      </div>
      {onCancelClick && (
        <div className="text-slate-400 cursor-pointer" onClick={onCancelClick}>
          <LuX
            size={iconSize}
            onClick={() => setSearchOpen(false)}
          />
        </div>
      )}
    </div>
  );
};

const CommandInput = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Input>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input>
>(({ className, ...props }, ref) => (
  <div className="flex items-center bg-black" cmdk-input-wrapper="">
    <CommandPrimitive.Input
      ref={ref}
      className={cn(
        'flex h-11 w-full rounded-md bg-transparent border-none text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
      {...props}
    />
  </div>
));

CommandInput.displayName = CommandPrimitive.Input.displayName;

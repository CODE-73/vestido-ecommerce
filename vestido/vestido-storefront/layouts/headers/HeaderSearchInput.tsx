import { FC, useEffect, useMemo, useRef, useState } from 'react';
import React from 'react';

import { Command as CommandPrimitive } from 'cmdk';
import { LuCheck, LuX } from 'react-icons/lu';

import { useCategories } from '@vestido-ecommerce/items/client';
import { cn } from '@vestido-ecommerce/shadcn-ui';
import { ComboboxOption } from '@vestido-ecommerce/shadcn-ui/combobox';
import {
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from '@vestido-ecommerce/shadcn-ui/command';
import {
  Popover,
  PopoverAnchor,
  PopoverContent,
} from '@vestido-ecommerce/shadcn-ui/popover';
import { slugify } from '@vestido-ecommerce/utils';

type HeaderSearchInputProps = {
  className?: string;
  containerClassName?: string;
  iconSize?: number;
  onChange?: (value: string) => void;
  onCancelClick?: () => void;
  setSearchOpen: React.Dispatch<React.SetStateAction<boolean>>;
  searchOpen?: boolean;
  shouldFilter?: boolean;
  value?: string | null;
  nullable?: boolean;
  multiple?: boolean;
  values?: string[];
  onSearch?: (value: string) => void;
};

export const HeaderSearchInput: FC<HeaderSearchInputProps> = ({
  containerClassName,
  onCancelClick,
  iconSize,
  setSearchOpen,
  onChange,
  value,
  onSearch,
}) => {
  const anchorRef = useRef<HTMLDivElement>(null);
  const [anchorWidth, setAnchorWidth] = useState<number>();

  const { data: categories } = useCategories();
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
  useEffect(() => {
    if (anchorRef.current) {
      setAnchorWidth(anchorRef.current.offsetWidth);
    }
  }, [open]);

  return (
    <div
      className={cn(
        'relative border-b-2 border-gray-400 px-2',
        'flex items-center justify-items-center content-center  my-2 bg-black',
        containerClassName,
      )}
    >
      <div className="min-w-full">
        <Popover open={open}>
          <CommandPrimitive
            shouldFilter={true}
            className="min-w-full md:min-w-[500px] min-h-[30px] "
          >
            <PopoverAnchor
              ref={anchorRef}
              className="min-w-full flex flex-row gap-2 items-center bg-black"
            >
              <div className="basis-11/12">
                <CommandInput
                  autoFocus
                  onFocus={(e) => {
                    setOpen(true);
                    setTimeout(() => {
                      e.target.focus();
                    }, 100);
                  }}
                  onValueChange={(search) => {
                    onSearch?.(search);
                  }}
                  placeholder="Search"
                  className=" min-h-[40px] bg-black border-none focus:border-none text-white"
                />
              </div>

              {onCancelClick && (
                <div
                  className="text-slate-400 cursor-pointer basis-1/12 flex flex-row justify-end"
                  onClick={onCancelClick}
                >
                  <LuX size={iconSize} onClick={() => setSearchOpen(false)} />
                </div>
              )}
            </PopoverAnchor>
            <PopoverContent
              style={{ width: anchorWidth }}
              className="min-w-full md:min-w-[500px] p-0 font-primary "
            >
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
                    className="font-bold px-0"
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

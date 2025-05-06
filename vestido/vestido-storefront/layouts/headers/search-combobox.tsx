'use client';

import * as React from 'react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

import { Command as CommandPrimitive } from 'cmdk';
import { LuSearch, LuX } from 'react-icons/lu';

import { useCategories } from '@vestido-ecommerce/items/client';
import { cn } from '@vestido-ecommerce/shadcn-ui';
import { Button } from '@vestido-ecommerce/shadcn-ui/button';
import { slugify } from '@vestido-ecommerce/utils';

export interface SearchItem {
  label: string;
  value: string;
}

interface SearchComboboxProps {
  onSelect: (item: SearchItem) => void;
  selectedItem: SearchItem | null;
  containerClassName?: string;
  setIsSearchExpanded: React.Dispatch<React.SetStateAction<boolean>>;
}

export function SearchCombobox({
  onSelect,
  containerClassName,
  setIsSearchExpanded,
  // selectedItem,
}: SearchComboboxProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);

  // Close the dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node) &&
        !document
          .querySelector('.search-dropdown')
          ?.contains(event.target as Node)
      ) {
        setOpen(false);
        setIsSearchExpanded(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setIsSearchExpanded]);

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

  // Filter items based on input
  const filteredItems = React.useMemo(() => {
    if (!inputValue) return [];

    return options.filter((item) =>
      item.label.toLowerCase().includes(inputValue.toLowerCase()),
    );
  }, [inputValue, options]);

  console.log('options', options);
  console.log('filtered', filteredItems);

  const flattenedItems = React.useMemo(() => {
    return filteredItems;
  }, [filteredItems]);

  const handleSelect = (item: SearchItem) => {
    console.log('item in handleSelect', item.value);
    setOpen(false);
    setInputValue('');
    onSelect(item);
    router.push(`/${encodeURIComponent(item.value)}`);
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!open || flattenedItems.length === 0) return;

    // Arrow down
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((prevIndex) => (prevIndex + 1) % flattenedItems.length);
    }

    // Arrow up
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex(
        (prevIndex) =>
          (prevIndex - 1 + flattenedItems.length) % flattenedItems.length,
      );
    }

    // Enter
    if (
      e.key === 'Enter' &&
      activeIndex >= 0 &&
      activeIndex < flattenedItems.length
    ) {
      e.preventDefault();
      handleSelect(flattenedItems[activeIndex]);
    }

    // Escape
    if (e.key === 'Escape') {
      e.preventDefault();
      setOpen(false);
    }
  };

  return (
    <div
      className={cn('relative w-full sm:w-64 md:w-80 py-4', containerClassName)}
    >
      <div className="relative">
        <LuSearch className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <input
          autoFocus
          ref={inputRef}
          type="text"
          placeholder="Search..."
          className="h-10 w-full border-b bg-transparent pl-8 pr-3 py-2 text-sm text-white ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            setActiveIndex(0);
            if (e.target.value) {
              setOpen(true);
            } else {
              setOpen(false);
            }
          }}
          onFocus={() => {
            if (inputValue) setOpen(true);
          }}
          onKeyDown={handleKeyDown}
        />
        {/* {inputValue && ( */}
        <Button
          variant="ghost"
          className="absolute right-0 top-0 h-10 w-10 p-0 hover:bg-transparent"
          onClick={() => {
            setInputValue('');
            setOpen(false);
            setIsSearchExpanded(false);
            inputRef.current?.focus();
          }}
        >
          <span className="sr-only">Clear</span>
          <LuX className="text-muted-foreground" size={18} />
        </Button>
        {/* )} */}
      </div>

      {open && (
        <div
          ref={listRef}
          className="search-dropdown absolute top-full z-50 mt-1 w-full rounded-md border border-input bg-background shadow-md"
        >
          <CommandPrimitive className="overflow-hidden rounded-md">
            {Object.keys(flattenedItems).length > 0 ? (
              <div className="max-h-80 overflow-auto p-1">
                {Object.entries(flattenedItems).map(([key, category]) => {
                  const isActive =
                    flattenedItems[activeIndex]?.value === category.value;
                  return (
                    <div key={key} className="px-2 py-1.5">
                      <CommandPrimitive.Item
                        key={category.value}
                        onSelect={() => handleSelect(category)}
                        className={`relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none ${
                          isActive ? 'bg-slate-200 text-accent-foreground' : ''
                        } hover:bg-slate-200 hover:text-accent-foreground`}
                        aria-selected={isActive}
                      >
                        {category.label}
                      </CommandPrimitive.Item>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="py-6 text-center text-xs">No results found.</div>
            )}
          </CommandPrimitive>
        </div>
      )}
    </div>
  );
}

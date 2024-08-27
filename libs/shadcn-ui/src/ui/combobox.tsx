'use client';
import { ComponentProps, FocusEventHandler, useEffect, useState } from 'react';

import { LuCheck, LuChevronsUpDown } from 'react-icons/lu';

import { cn } from '../utils';
import { Button } from './button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from './command';
import { Popover, PopoverContent, PopoverTrigger } from './popover';

export interface ComboboxOption {
  value: string;
  label: string;
}

const NullOption: ComboboxOption = { value: '', label: 'None' };

export interface ComboboxProps {
  value: string | null;
  multiple?: boolean;
  values?: string[];
  nullable?: boolean;
  onChange?: (value: string) => void;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  disabled?: boolean;
  placeholder?: string;
  noOptionsText?: string;
  options: ComboboxOption[];
  /** Can be used to show a Loading Indicator. Useful when doing search on Server Side */
  isLoading?: boolean;
  onSearch?: (value: string) => void;
  fullWidth?: boolean;
  className?: string;
  inputProps?: ComponentProps<typeof CommandInput>;
}

function Combobox({
  placeholder,
  noOptionsText,
  disabled,
  options,
  value,
  onChange,
  onBlur,
  onSearch,
  nullable,
  isLoading: _isLoading,
  multiple,
  values = [],
  className,
  inputProps = {},
}: ComboboxProps) {
  const [open, setOpen] = useState(false);

  // Used to keep track of the previous selection
  // Incoming options[] may no longer contain the selected value
  // This is used to show the selected value when it's not in the list
  const [prevSelection, setPrevSelection] = useState<ComboboxOption | null>(
    null,
  );

  useEffect(() => {
    // Clear Selection if value got changed from outside
    if (prevSelection && value !== prevSelection.value) {
      setPrevSelection(null);
    }
  }, [value, prevSelection]);

  if (nullable) {
    options = [NullOption, ...options];
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          disabled={disabled}
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn('w-full justify-between rounded-lg', className)}
          type="button"
        >
          {
            /* Show 'placeholder' when the SelectedValue options is not in the list */
            value
              ? options.find((option) => option.value === value)?.label ||
                prevSelection?.label ||
                placeholder
              : placeholder || 'Select'
          }
          <LuChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[780px] p-0 font-primary">
        <Command shouldFilter={false} className="w-full">
          <CommandInput
            autoFocus
            onBlur={onBlur}
            onValueChange={(search) => {
              onSearch?.(search);
            }}
            placeholder={placeholder}
            {...inputProps}
          />
          <CommandEmpty>{noOptionsText || 'No Options'}</CommandEmpty>
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
                    !multiple && value === option.value && 'opacity-100',
                    multiple && values.includes(option.value) && 'opacity-100',
                  )}
                />
                {option.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export { Combobox };

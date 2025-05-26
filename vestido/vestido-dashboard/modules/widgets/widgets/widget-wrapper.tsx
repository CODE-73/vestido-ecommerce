// src/components/WidgetWrapper.tsx
import React, { ReactElement, useCallback, useMemo } from 'react';

import {
  Options,
  parseAsBoolean,
  parseAsFloat,
  parseAsInteger,
  parseAsString,
  ParserBuilder,
  useQueryStates,
} from 'nuqs';

import { useWidgets } from '../widgets-provider';

export type WidgetFilterValues =
  | string
  | number
  | boolean
  | string[]
  | undefined
  | null; // string[] for parseAsArrayOfStrings

export interface BaseWidgetFilters {
  [key: string]: WidgetFilterValues;
}

export interface InjectedWidgetProps<TFilters extends BaseWidgetFilters> {
  fromDate: string;
  toDate: string;
  widgetFilters: TFilters;
  onWidgetFilterChange: <K extends keyof TFilters>(
    filterName: K,
    value: TFilters[K] | null, // nuqs setters often use null to remove param
  ) => void;
  widgetId: string;
}

interface WidgetWrapperProps<TFilters extends BaseWidgetFilters> {
  widgetId: string;
  children: ReactElement<InjectedWidgetProps<TFilters>>;
  defaultFilters: TFilters; // Used to determine keys and their types for parsers
}

// Helper to get a nuqs parser based on the type of the default value
const getParserForValue = (
  value: WidgetFilterValues,
): ParserBuilder<string> | ParserBuilder<boolean> | ParserBuilder<number> => {
  if (typeof value === 'boolean') return parseAsBoolean;
  if (typeof value === 'number') {
    // Differentiate between float and int if necessary, or just use parseAsFloat
    return Number.isInteger(value) ? parseAsInteger : parseAsFloat;
  }
  // if (Array.isArray(value) && value.every(item => typeof item === 'string')) return parseAsArrayOfStrings();
  // Add more sophisticated parser selections if needed (e.g., for dates, JSON, arrays)
  return parseAsString; // Default to string
};

export const WidgetWrapper = <TFilters extends BaseWidgetFilters>({
  widgetId,
  children,
  defaultFilters,
}: WidgetWrapperProps<TFilters>) => {
  const { fromDate, toDate } = useWidgets();

  // Dynamically build the schema for useQueryStates
  const queryStatesSchema = useMemo(() => {
    const schema: Record<string, ParserBuilder<WidgetFilterValues>> = {};
    for (const key in defaultFilters) {
      const paramKey = `${widgetId}_${key}`;
      // @ts-expect-error Nuqs Parser Type Mismatch
      schema[paramKey] = getParserForValue(
        defaultFilters[key as keyof TFilters],
      ).withDefault(defaultFilters[key as keyof TFilters] as unknown); // Apply default from defaultFilters
    }
    return schema;
  }, [widgetId, defaultFilters]);

  const nuqsOptions: Partial<Options> = {
    history: 'push',
    shallow: false, // Important for Next.js if you don't want full page reloads/refetches
  };

  // `useQueryStates` returns an object with current values and an updater function
  const [parsedStates, setParsedStates] = useQueryStates(
    queryStatesSchema,
    nuqsOptions,
  );

  // Transform parsedStates (which are prefixed) back into widgetFilters object
  const widgetFilters = useMemo(() => {
    const filters: Partial<TFilters> = {};
    for (const key in defaultFilters) {
      const paramKey = `${widgetId}_${key}`;
      filters[key as keyof TFilters] = parsedStates[
        paramKey
      ] as TFilters[keyof TFilters];
    }
    return filters as TFilters;
  }, [parsedStates, defaultFilters, widgetId]);

  const handleWidgetFilterChange = useCallback(
    <K extends keyof TFilters>(filterName: K, value: TFilters[K] | null) => {
      const paramKey = `${widgetId}_${String(filterName)}`;
      // `setParsedStates` can update multiple states, but here we update one.
      // It expects an object matching the schema structure.
      setParsedStates({
        [paramKey]: value,
      });
    },
    [setParsedStates, widgetId],
  );

  if (!React.isValidElement(children)) {
    return null;
  }

  const childProps: InjectedWidgetProps<TFilters> = {
    fromDate,
    toDate,
    widgetFilters,
    onWidgetFilterChange: handleWidgetFilterChange,
    widgetId,
  };

  return React.cloneElement(children, childProps);
};

// src/contexts/WidgetsProvider.tsx
import { createContext, ReactNode, useCallback, useContext } from 'react';

import { addDays } from 'date-fns';
import { parseAsString, useQueryState } from 'nuqs';

import { formatDate } from './formatters';

export interface WidgetsContextType {
  fromDate: string;
  toDate: string;
  handleDateChange: (
    newFromDate: string | null,
    newToDate: string | null,
  ) => void;
}

const WidgetsContext = createContext<WidgetsContextType | undefined>(undefined);

export const useWidgets = (): WidgetsContextType => {
  const context = useContext(WidgetsContext);
  if (!context) {
    throw new Error('useWidgets must be used within a WidgetsProvider');
  }
  return context;
};

interface WidgetsProviderProps {
  children: ReactNode;
}

export const WidgetsProvider = ({ children }: WidgetsProviderProps) => {
  const [fromDate, setFromDate] = useQueryState(
    'from',
    parseAsString.withDefault(formatDate(addDays(new Date(), -30))),
  );
  const [toDate, setToDate] = useQueryState(
    'to',
    parseAsString.withDefault(formatDate(new Date())),
  );

  const handleDateChange = useCallback(
    (newFromDate: string | null, newToDate: string | null) => {
      setFromDate(newFromDate);
      setToDate(newToDate);
    },
    [setFromDate, setToDate],
  );

  return (
    <WidgetsContext.Provider value={{ fromDate, toDate, handleDateChange }}>
      {children}
    </WidgetsContext.Provider>
  );
};

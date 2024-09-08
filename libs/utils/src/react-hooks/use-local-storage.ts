import { Dispatch, SetStateAction, useEffect, useState } from 'react';

import { VestidoError } from '../errors';

export function useLocalStorageState<T>(
  key: string,
  defaultValue: T,
): [T, Dispatch<SetStateAction<T>>, boolean] {
  const [isMounted, setMounted] = useState(false);
  const [value, setValue] = useState<T>(defaultValue);

  useEffect(() => {
    try {
      const item = window.localStorage.getItem(key);
      if (item) {
        setValue(JSON.parse(item));
      }
    } catch (e) {
      console.error(
        new VestidoError({
          name: 'useLocalStorageStateError',
          message: 'Error parsing local storage',
          context: {
            key,
            value: window.localStorage.getItem(key),
            error: e,
          },
        }),
      );
    }
    return () => {
      setMounted(false);
    };
  }, [key]);

  useEffect(() => {
    if (isMounted) {
      window.localStorage.setItem(key, JSON.stringify(value));
    } else {
      setMounted(true);
    }
  }, [key, value]);

  return [value, setValue, isMounted];
}

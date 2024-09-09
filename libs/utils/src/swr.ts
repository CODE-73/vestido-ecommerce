'use client';

import { useSWRConfig } from 'swr';

export function useClearCacheOnSuccess(keyRoot: string, clearData = true) {
  const { mutate } = useSWRConfig();

  const keyMatcher = (key: string | string[]) =>
    key instanceof Array && key[0] === keyRoot;

  return {
    onSuccess() {
      if (!clearData) {
        return mutate(keyMatcher);
      }

      return mutate(keyMatcher, undefined, true);
    },
  };
}

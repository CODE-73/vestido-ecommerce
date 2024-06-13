"use client";

import { useSWRConfig } from 'swr';

export function useClearCacheOnSuccess(...keyRoot: string[]) {
  const { mutate } = useSWRConfig();
  return {
    onSuccess() {
      return mutate(
        (key: string | string[]) =>
          key instanceof Array && keyRoot.includes(key[0])
      );
    },
  };
}

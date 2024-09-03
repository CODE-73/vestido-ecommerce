'use client';

import { useSWRConfig } from 'swr';

export function useClearCacheOnSuccess(...keyRoot: string[]) {
  const { mutate } = useSWRConfig();
  return {
    onSuccess() {
      return mutate(
        (key: string | string[]) => {
          const shouldMutate = key instanceof Array && keyRoot.includes(key[0]);
          if (shouldMutate) {
            // console.info('Clearing Cache on Success:', key);
          }
          return shouldMutate;
        },
        undefined,
        true,
      );
    },
  };
}

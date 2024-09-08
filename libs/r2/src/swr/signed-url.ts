import useSWR from 'swr';

import {
  makeSignedUrl,
  MakeSignedUrlRequest,
  MakeSignedUrlResponse,
} from './../services/make-signed-url';
import { R2SWRKeys } from './keys';

type UseR2SignedURLArgs = Omit<MakeSignedUrlRequest, 'key'> & {
  key?: string | null;
};

export function useR2SignedURL(args: UseR2SignedURLArgs) {
  const key = args.key
    ? [R2SWRKeys.SIGNED_URL, args.key, args.requestType]
    : null;

  return useSWR<MakeSignedUrlResponse, Error, string[] | null>(
    key,
    () =>
      makeSignedUrl({
        ...args,
        key: args.key ?? '',
      }),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    },
  );
}

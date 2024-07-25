import useSWR from 'swr';

import {
  makeSignedUrl,
  MakeSignedUrlRequest,
  MakeSignedUrlResponse,
} from './../services/make-signed-url';
import { R2SWRKeys } from './keys';

export function useR2SignedURL(args: MakeSignedUrlRequest) {
  const key = args.key
    ? [R2SWRKeys.SIGNED_URL, args.key, args.requestType]
    : null;

  return useSWR<MakeSignedUrlResponse, Error, string[] | null>(
    key,
    () => makeSignedUrl(args),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    },
  );
}

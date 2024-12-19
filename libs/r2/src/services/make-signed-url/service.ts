import { VestidoError } from '@vestido-ecommerce/utils';

import { MakeSignedUrlRequest, MakeSignedUrlResponse } from './types';

export async function makeSignedUrl(
  args: MakeSignedUrlRequest,
): Promise<MakeSignedUrlResponse> {
  const r = await fetch(getBucketManagerURL(), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...args,
    }),
  });

  if (!r.ok) {
    const responseText = await r.text();
    throw new VestidoError({
      name: 'R2SignedURLFailed',
      message: 'Failed fetching signed URL',
      httpStatus: 500,
      context: {
        responseText,
        responseStatus: r.status,
        args,
      },
    });
  }
  const data = await r.json();

  if (!data.success) {
    throw new VestidoError({
      name: 'R2SignedURLFailed',
      message: 'Failed fetching signed URL',
      httpStatus: 500,
      context: {
        data,
        responseStatus: r.status,
        args,
      },
    });
  }

  return data.signedURL;
}

function getBucketManagerURL() {
  return (
    process.env['NEXT_PUBLIC_BUCKET_MANAGER_URL'] ??
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore inlining as per expo docs
    process.env.EXPO_PUBLIC_BUCKET_MANAGER_URL ??
    ''
  );
}

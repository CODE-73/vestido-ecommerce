import { MakeSignedUrlRequest, MakeSignedUrlResponse } from './types';

export async function makeSignedUrl(
  args: MakeSignedUrlRequest
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
    console.error(r);
    throw new Error('Failed fetching signed URL');
  }

  const data = await r.json();

  if (!data.success) {
    console.error(data);
    throw new Error('Failed fetching signed URL');
  }

  console.info('Made Signed Url: ', args.requestType, args.key, data.signedURL);
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

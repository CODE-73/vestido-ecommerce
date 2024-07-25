import { makeSignedUrl } from '@vestido-ecommerce/r2';
import { ImageSchemaType } from '@vestido-ecommerce/utils';

import { getRedisClient } from './client';

const SIGNED_URL_EXPRIY = 2 * 24 * 60 * 60; // 2 days // 48 hours
const REDIS_KEY_EXPIRY = SIGNED_URL_EXPRIY - 3 * 60 * 60; // 45 hours

export async function populateImageURLs(images: ImageSchemaType[]) {
  if (!images || images.length === 0) {
    return;
  }

  await getRedisClient();
  const imgKeys = Array.from(new Set(images.flatMap((x) => x.key)));
  const urlMap: { [x: string]: string } = {};

  await Promise.all(
    imgKeys.map((x) =>
      _makeSignedUrl(x).then((url) => {
        urlMap[x] = url;
        return url;
      }),
    ),
  );

  for (const img of images) {
    if (img.key in urlMap) {
      img.url = urlMap[img.key];
    }
  }
}

async function _makeSignedUrl(key: string) {
  const client = await getRedisClient();
  const imgKey = `img:${key}`;

  let url = await client.get(imgKey);
  if (!url) {
    url = await makeSignedUrl({
      requestType: 'GET',
      key,
      expiresIn: SIGNED_URL_EXPRIY,
    });
    await client.set(imgKey, url, { EX: REDIS_KEY_EXPIRY });
  }

  return url;
}

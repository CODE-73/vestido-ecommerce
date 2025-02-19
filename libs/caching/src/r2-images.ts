import * as Sentry from '@sentry/nextjs';
import { differenceInHours, parse } from 'date-fns';
import { thumbHashToDataURL } from 'thumbhash';

import { makeSignedUrl as _makeSignedUrl } from '@vestido-ecommerce/r2';
import { ImageSchemaType, VestidoError } from '@vestido-ecommerce/utils';

import { getRedisClient } from './client';

const SIGNED_URL_EXPRIY = 2 * 24 * 60 * 60; // 2 days // 48 hours
const REDIS_KEY_EXPIRY = SIGNED_URL_EXPRIY / 2;

/**
 * Always overwrites existing urls
 *
 * @param images ImagesSchemaType[]
 * @returns ImagesSchemaType[] populated with signed urls
 */
export async function populateImageURLs(images: ImageSchemaType[]) {
  if (!images || images.length === 0) {
    return;
  }

  await getRedisClient();
  const imgKeys = Array.from(
    new Set(images.flatMap((x) => x.key).filter((x) => !!x)),
  ) as string[];
  const urlMap: { [x: string]: string } = {};

  await Promise.all(
    imgKeys.map((x) =>
      makeSignedUrl(x).then((url) => {
        urlMap[x] = url;
        return url;
      }),
    ),
  );

  for (const img of images) {
    if (!img.key) {
      continue;
    }
    if (img.key in urlMap) {
      img.url = urlMap[img.key];
    }

    if (img.blurHash) {
      img.blurHashDataURL = thumbHashToDataURL(
        Buffer.from(img.blurHash, 'base64'),
      );
    }
  }
}

/**
 * Generates a signed URL for the given R2 File Key and stores it in Redis
 *
 * @param key R2 File Key
 * @returns Signed URL
 */
export async function makeSignedUrl(key: string) {
  const client = await getRedisClient();
  const imgKey = `img:${key}`;

  let url = await client.get(imgKey);
  if (!url || !validateImageURL(url)) {
    url = await _makeSignedUrl({
      requestType: 'GET',
      key,
      expiresIn: SIGNED_URL_EXPRIY,
    });
    await client.setEx(imgKey, REDIS_KEY_EXPIRY, url);
  }

  return url;
}

function validateImageURL(_url: string) {
  let url: URL | null = null;
  try {
    url = new URL(_url);
  } catch (e) {
    Sentry.captureException(
      new VestidoError({
        name: 'InvalidPresignedImageURL',
        message: 'URL Parsing Failed',
        httpStatus: 500,
        context: {
          url: _url,
          error: e,
        },
      }),
    );
    return false;
  }

  const amzDate = url.searchParams.get('X-Amz-Date');
  const amzExpires = url.searchParams.get('X-Amz-Expires');

  if (!amzDate || !amzExpires) {
    Sentry.captureException(
      new VestidoError({
        name: 'InvalidPresignedImageURL',
        message: 'Missing X-Amz-Date or X-Amz-Expires',
        httpStatus: 500,
        context: {
          url: _url,
        },
      }),
    );
    return false;
  }

  // Parse the X-Amz-Date (format: YYYYMMDDTHHmmssZ)
  const date = parse(amzDate, "yyyyMMdd'T'HHmmss'Z'", new Date());

  // Calculate the expiry time
  const expiryTime = new Date(date.getTime() + parseInt(amzExpires) * 1000);

  // Check if the expiry is at least 12 hours into the future
  const now = new Date();
  if (differenceInHours(expiryTime, now) >= REDIS_KEY_EXPIRY / 60 / 60) {
    return true;
  } else {
    Sentry.captureException(
      new VestidoError({
        name: 'InvalidPresignedImageURL',
        message: 'Expiry time is less than 12 hours into the future',
        httpStatus: 500,
        context: {
          url: _url,
        },
      }),
    );
    return false;
  }
}

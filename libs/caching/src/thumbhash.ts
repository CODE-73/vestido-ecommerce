import sharp from 'sharp';
import { rgbaToThumbHash } from 'thumbhash';

import { ImageSchemaType, VestidoError } from '@vestido-ecommerce/utils';

import { makeSignedUrl } from './r2-images';

/*
 * Sharp is locked in at 0.30.4
 * - https://github.com/vercel/vercel/issues/11052#issuecomment-1902268925
 * - Vercel Test Suite
 *   https://github.com/vercel/vercel/blob/main/packages/node/test/fixtures/30-sharp/package.json
 * - NextJS Config Updates
 *   - Add sharp to externals
 *   - Mock child_process
 *   These two changes can be seen at dashboard/next.config.js & storefront/next.config.js
 */

type MakeThumbHashArgs = {
  fileUrl?: string;
  file?: Blob | ArrayBuffer;
};

export async function makeThumbHash({ fileUrl, file }: MakeThumbHashArgs) {
  if (fileUrl) {
    file = await fetch(fileUrl).then((r) => r.blob());
  }

  if (!file) {
    throw new VestidoError({
      name: 'ThumbhashNoFileProvided',
      message: 'No file provided for thumbhash generation',
      httpStatus: 400,
      context: {
        fileUrl,
        hasFile: !!file,
      },
    });
  }

  if (file instanceof Blob) {
    file = await file.arrayBuffer();
  }

  const buffer = Buffer.from(file);
  const image = sharp(buffer);
  const { data, info } = await image
    .resize(100, 100, { fit: 'inside' })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height } = info;

  const thumbHash = rgbaToThumbHash(width, height, data);
  return Buffer.from(thumbHash).toString('base64');
}

export async function addThumbhashToImages(images: ImageSchemaType[]) {
  return await Promise.all(
    images.map(async (img) => {
      if (img.blurHash || !img.key) {
        return;
      }

      const url = img.url || (await makeSignedUrl(img.key));
      if (!url) {
        // Skip images that don't have a valid URL
        return;
      }

      const blurHash = await makeThumbHash({ fileUrl: url });
      img.blurHash = blurHash;
    }),
  );
}

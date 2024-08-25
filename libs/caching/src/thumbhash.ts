import { Image } from 'image-js';
import { rgbaToThumbHash } from 'thumbhash';

import { ImageSchemaType } from '@vestido-ecommerce/utils';

import { makeSignedUrl } from './r2-images';

type MakeThumbHashArgs = {
  fileUrl?: string;
  file?: Blob | ArrayBuffer;
};

export async function makeThumbHash({ fileUrl, file }: MakeThumbHashArgs) {
  if (fileUrl) {
    file = await fetch(fileUrl).then((r) => r.blob());
  }

  if (!file) {
    throw new Error('No file provided');
  }

  if (file instanceof Blob) {
    file = await file.arrayBuffer();
  }

  const buffer = Buffer.from(file);
  let image = await Image.load(buffer);
  if (!image.alpha) {
    image = image.rgba8();
  }

  // Resize to 100x100
  image = image.resize({
    height: 100,
    width: 100,
    preserveAspectRatio: true,
  });

  const { width, height, data } = image;

  const thumbHash = rgbaToThumbHash(width, height, data);
  return Buffer.from(thumbHash).toString('base64');
}

export async function addThumbhashToImages(images: ImageSchemaType[]) {
  return await Promise.all(
    images.map(async (img) => {
      if (img.blurHash) {
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

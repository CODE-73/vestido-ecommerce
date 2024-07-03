import { getPrismaClient } from '@vestido-ecommerce/models';
import { makeSignedUrl } from '@vestido-ecommerce/r2';
import { ImageSchemaType } from '@vestido-ecommerce/utils';

export async function itemDetails(itemId: string) {
  const prisma = getPrismaClient();

  const item = await prisma.item.findUnique({
    where: {
      id: itemId,
    },
    include: {
      variants: true,
    },
  });
  // no try..catch here

  const imgKeys = Array.from(
    new Set((item?.images as ImageSchemaType[]).flatMap((x) => x.key))
  );

  const urlMap: { [x: string]: string } = {};
  await Promise.all(
    imgKeys.map((x) =>
      makeSignedUrl({
        requestType: 'GET',
        key: x,
        expiresIn: 3600,
      }).then((url) => {
        urlMap[x] = url;
        return url;
      })
    )
  );

  const images = (item?.images ?? []) as ImageSchemaType[];
  for (const img of images) {
    if (img.key in urlMap) {
      img.url = urlMap[img.key];
    }
  }

  return item;
}

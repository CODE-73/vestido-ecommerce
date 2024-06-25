import { PrismaClient } from '@prisma/client';
import { ListItemRequest } from './types';
import { ListItemRequestSchema } from './zod';
import { ImageSchemaType } from '@vestido-ecommerce/utils';
import { makeSignedUrl } from '@vestido-ecommerce/r2';

export async function listItem(_args: ListItemRequest) {
  const prisma = new PrismaClient();
  const args = ListItemRequestSchema.parse(_args);
  // pass to prisma next

  const itemList = await prisma.item.findMany({
    ...(args?.q
      ? {
          where: {
            OR: [
              { title: { contains: args.q, mode: 'insensitive' } }, // Example field to search
              { description: { contains: args.q } }, // Another example field to search
            ],
          },
        }
      : {}),
    include: {
      category: true,
    },
  });
  // no try..catch here

  console.log('type of', typeof itemList[0].images, itemList[0].images);
  const imgKeys = Array.from(
    new Set(
      itemList.flatMap((item) =>
        (item.images as ImageSchemaType[]).flatMap((x) => x.key)
      )
    )
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

  for (const item of itemList) {
    const images = (item.images ?? []) as ImageSchemaType[];
    for (const img of images) {
      if (img.key in urlMap) {
        img.url = urlMap[img.key];
      }
    }
  }

  return itemList;
}

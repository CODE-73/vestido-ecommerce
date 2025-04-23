import { Prisma } from '@prisma/client';
import { z } from 'zod';

import { getPrismaClient } from '@vestido-ecommerce/models';

import { ListReturnSchema } from './zod';

export async function listReturnOrders(data: unknown) {
  const prisma = getPrismaClient();
  const validatedData = ListReturnSchema.parse(data);
  const orderByArray = validatedData.orderBy?.map(({ column, direction }) => ({
    [column]: direction,
  })) || [{ createdAt: 'asc' }];

  const returnStatusCondition =
    validatedData.returnStatus && validatedData.returnStatus.length > 0
      ? { returnStatus: { in: validatedData.returnStatus } }
      : {};

  const searchCondition = validatedData.q
    ? returnSearchCondition(validatedData.q)
    : {};

  const dateFilter =
    validatedData.fromDate || validatedData.toDate
      ? {
          createdAt: {
            ...(validatedData.fromDate
              ? { gte: new Date(validatedData.fromDate) }
              : {}),
            ...(validatedData.toDate
              ? {
                  lte: new Date(
                    new Date(validatedData.toDate).setHours(23, 59, 59, 999),
                  ),
                }
              : {}),
          },
        }
      : {};
  const whereCondition = {
    ...returnStatusCondition,
    ...searchCondition,
    ...dateFilter,
  };

  const returnOrderList = await prisma.return.findMany({
    skip: validatedData.start,
    take: validatedData.limit,
    orderBy: orderByArray,
    where: whereCondition,
  });
  return returnOrderList;
}

// type QueryMode = Prisma.QueryMode;

export function returnSearchCondition(q: string) {
  const isValidUUID = (value: string) =>
    z.string().uuid().safeParse(value).success;

  const searchCondition = {
    OR: [
      {
        return_no: {
          equals: !isNaN(Number(q)) ? Number(q) : undefined,
        },
      },
      {
        id: isValidUUID(q) ? { equals: q } : undefined,
      },
      {
        orderId: isValidUUID(q) ? { equals: q } : undefined,
      },
      {
        shipmentId: {
          contains: q ? q : undefined,
        },
      },
      {
        fulfillment: {
          OR: [
            {
              fulfillment_no: {
                equals: !isNaN(Number(q)) ? Number(q) : undefined,
              },
            },
            {
              id: isValidUUID(q) ? { equals: q } : undefined,
            },
          ],
        },
      },
    ],
  } satisfies Prisma.ReturnWhereInput;

  return searchCondition;
}

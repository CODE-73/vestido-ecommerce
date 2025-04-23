import { Prisma } from '@prisma/client';
import { z } from 'zod';

import { getPrismaClient } from '@vestido-ecommerce/models';

import { ListFulfillmentSchema } from './zod';
export async function getFulfillmentList(data: unknown) {
  const prisma = getPrismaClient();

  const validatedData = ListFulfillmentSchema.parse(data);

  const orderByArray = validatedData.orderBy?.map(({ column, direction }) => ({
    [column]: direction,
  })) || [{ createdAt: 'asc' }];

  const fulfillmentStatusCondition =
    validatedData.fulfillmentStatus &&
    validatedData.fulfillmentStatus.length > 0
      ? { status: { in: validatedData.fulfillmentStatus } }
      : {};

  const searchCondition = validatedData.q
    ? fulfillmentSearchCondition(validatedData.q)
    : {};

  const dateFilter =
    validatedData.fromDate || validatedData.toDate
      ? {
          createdAt: {
            ...(validatedData.fromDate ? { gte: validatedData.fromDate } : {}),
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
    ...fulfillmentStatusCondition,
    ...searchCondition,
    ...dateFilter,
  };

  const fulfillmentList = await prisma.fulfillment.findMany({
    skip: validatedData.start,
    take: validatedData.limit,
    orderBy: orderByArray,
    where: whereCondition,
    include: {
      order: {
        select: { order_no: true },
      },
      fulfillmentItems: {
        include: {
          orderItem: {
            include: {
              item: true,
            },
          },
        },
      },
    },
  });

  return fulfillmentList;
}

type QueryMode = Prisma.QueryMode;

export function fulfillmentSearchCondition(q: string) {
  const isValidUUID = (value: string) =>
    z.string().uuid().safeParse(value).success;

  const searchCondition = {
    OR: [
      {
        fulfillment_no: {
          equals: !isNaN(Number(q)) ? Number(q) : undefined,
        },
      }, // Search by exact order number
      {
        id: isValidUUID(q) ? { equals: q } : undefined,
      },
      {
        orderId: isValidUUID(q) ? { equals: q } : undefined,
      },
      {
        description: {
          contains: q,
          mode: 'insensitive' satisfies QueryMode,
        },
      },
      {
        shipment_id: {
          contains: q,
          mode: 'insensitive' satisfies QueryMode,
        },
      },
      {
        shiprocket_order_id: {
          contains: q,
          mode: 'insensitive' satisfies QueryMode,
        },
      },
      {
        tracking: {
          contains: q,
          mode: 'insensitive' satisfies QueryMode,
        },
      },
    ],
  } satisfies Prisma.FulfillmentWhereInput;

  return searchCondition;
}

import { z } from 'zod';

import { getPrismaClient } from '@vestido-ecommerce/models';

import { listAdminOrdersSchema } from './zod';

export async function listAdminOrders(data: unknown) {
  const prisma = getPrismaClient();

  const validatedData = listAdminOrdersSchema.parse(data);

  const orderByArray = validatedData.orderBy?.map(({ column, direction }) => ({
    [column]: direction,
  })) || [{ createdAt: 'asc' }];

  // Construct the where filter condition for orderStatus if the array is not null and not empty
  const orderStatusCondition =
    validatedData.orderStatus && validatedData.orderStatus.length > 0
      ? { orderStatus: { in: validatedData.orderStatus } }
      : {};

  const searchCondition = validatedData.q
    ? orderSearchCondition(validatedData.q)
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
    ...orderStatusCondition,
    ...searchCondition,
    ...dateFilter,
  };

  const orderList = await prisma.order.findMany({
    skip: validatedData.start,
    take: validatedData.limit,
    orderBy: orderByArray,
    where: whereCondition,
  });

  return orderList;
}

import { Prisma } from '@prisma/client';

type QueryMode = Prisma.QueryMode;

export function orderSearchCondition(q: string) {
  const isValidUUID = (value: string) =>
    z.string().uuid().safeParse(value).success;

  const searchCondition = {
    OR: [
      {
        order_no: {
          equals: !isNaN(Number(q)) ? Number(q) : undefined,
        },
      }, // Search by exact order number
      {
        id: isValidUUID(q) ? { equals: q } : undefined,
      },
      {
        description: {
          contains: q,
          mode: 'insensitive' satisfies QueryMode,
        },
      },
      {
        couponCode: {
          contains: q,
          mode: 'insensitive' satisfies QueryMode,
        },
      },
      {
        customer: {
          OR: [
            {
              firstName: {
                contains: q,
                mode: 'insensitive' satisfies QueryMode,
              },
            },
            {
              lastName: {
                contains: q,
                mode: 'insensitive' satisfies QueryMode,
              },
            },
            {
              email: {
                contains: q,
                mode: 'insensitive' satisfies QueryMode,
              },
            },
          ],
        },
      },
      {
        shippingAddress: {
          OR: [
            {
              district: {
                contains: q,
                mode: 'insensitive' satisfies QueryMode,
              },
            },
            {
              pinCode: {
                contains: q,
                mode: 'insensitive' satisfies QueryMode,
              },
            },
          ],
        },
      },
      {
        fulfillments: {
          some: {
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
      },
    ],
  } satisfies Prisma.OrderWhereInput;

  return searchCondition;
}

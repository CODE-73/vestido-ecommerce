import { Prisma } from '@prisma/client';

type QueryMode = Prisma.QueryMode;

export function orderSearchCondition(q: string) {
  const isValidUUID = (value: string) =>
    /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(
      value,
    );

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

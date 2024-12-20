import { Prisma } from '@prisma/client';

type QueryMode = Prisma.QueryMode;

export function fulfillmentSearchCondition(q: string) {
  const isValidUUID = (value: string) =>
    /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(
      value,
    );

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

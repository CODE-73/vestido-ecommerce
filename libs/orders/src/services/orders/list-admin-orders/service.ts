import { getPrismaClient } from '@vestido-ecommerce/models';

export async function listAdminOrders(options?: {
  orderBy?: Record<string, 'asc' | 'desc'>;
}) {
  const prisma = getPrismaClient();
  const orderList = await prisma.order.findMany({
    orderBy: options?.orderBy, // Apply sorting if provided
  });

  return orderList;
}

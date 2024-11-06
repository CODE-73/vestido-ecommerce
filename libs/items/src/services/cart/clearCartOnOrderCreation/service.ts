import { getPrismaClient } from '@vestido-ecommerce/models';
import { VestidoError } from '@vestido-ecommerce/utils';

export async function clearCartOnOrderCreation(orderId: string) {
  const prisma = getPrismaClient();

  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: {
      orderItems: true, // Fetch related order items
    },
  });

  if (!order) {
    throw new VestidoError({
      name: 'SystemErrorOrderNotFound',
      message: `Order ${orderId} not found`,
    });
  }

  // Now the `order` includes `orderItems`
  await prisma.cartItem.deleteMany({
    where: {
      customerId: order.customerId,
      itemId: {
        in: order.orderItems.map((item) => item.itemId),
      },
    },
  });
}

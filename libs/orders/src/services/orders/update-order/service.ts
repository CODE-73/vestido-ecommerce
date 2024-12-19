import { getPrismaClient } from '@vestido-ecommerce/models';

import { UpdateOrderSchema, UpdateOrderSchemaType } from './zod';

export async function updateOrder(
  orderId: string,
  data: UpdateOrderSchemaType,
) {
  const prisma = getPrismaClient();
  const validatedData = UpdateOrderSchema.parse(data);

  const updatedOrder = await prisma.order.update({
    where: {
      id: validatedData.id,
    },
    data: {
      description: validatedData.description,
    },
  });

  return updatedOrder;
}

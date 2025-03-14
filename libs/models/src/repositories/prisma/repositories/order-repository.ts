import { Order, Prisma } from '@prisma/client';

import { PrismaRepository } from '../prisma-repository';

/**
 * Repository for Order entity
 */
export class OrderRepository extends PrismaRepository<
  Order,
  Prisma.OrderCreateInput,
  Prisma.OrderUpdateInput
> {
  protected modelName = 'order';

  /**
   * Find order with all related details
   */
  async findOrderWithDetails(
    orderId: string,
    transactionContext?: unknown,
  ): Promise<
    | (Order & {
        customer: any;
        shippingAddress: any;
        orderItems: any[];
        payments: any[];
        fulfillments: any[];
      })
    | null
  > {
    const prisma = this.getPrisma(transactionContext);

    return prisma.order.findUnique({
      where: { id: orderId },
      include: {
        customer: true,
        shippingAddress: true,
        orderItems: {
          include: {
            item: true,
            variant: true,
            fulfillmentItems: {
              include: {
                fulfillment: true,
              },
            },
          },
        },
        payments: true,
        fulfillments: {
          include: {
            fulfillmentItems: {
              include: {
                orderItem: true,
              },
            },
          },
        },
      },
    });
  }

  /**
   * Find orders for a specific customer
   */
  async findOrdersByCustomer(
    customerId: string,
    transactionContext?: unknown,
  ): Promise<Order[]> {
    const prisma = this.getPrisma(transactionContext);

    return prisma.order.findMany({
      where: { customerId },
      orderBy: { createdAt: 'desc' },
      include: {
        orderItems: {
          include: {
            item: true,
            variant: true,
          },
        },
      },
    });
  }

  /**
   * Update order status
   */
  async updateOrderStatus(
    orderId: string,
    status: any,
    transactionContext?: unknown,
  ): Promise<Order> {
    const prisma = this.getPrisma(transactionContext);

    return prisma.order.update({
      where: { id: orderId },
      data: { orderStatus: status },
    });
  }
}

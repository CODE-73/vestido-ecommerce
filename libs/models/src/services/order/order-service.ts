import { Order } from '@prisma/client';

import { VestidoError } from '@vestido-ecommerce/utils';

import { PrismaTransactionManager } from '../../repositories/prisma/prisma-transaction-manager';
import { OrderRepository } from '../../repositories/prisma/repositories/order-repository';
import { BaseService } from '../base-service';

/**
 * Interface for OrderService
 */
export interface IOrderService extends BaseService<Order> {
  getOrderDetails(orderId: string): Promise<
    | (Order & {
        customer: any;
        shippingAddress: any;
        orderItems: any[];
        payments: any[];
        fulfillments: any[];
      })
    | null
  >;
  getCustomerOrders(customerId: string): Promise<Order[]>;
  updateStatus(orderId: string, status: any): Promise<Order>;
  cancelOrder(orderId: string, reason: string): Promise<boolean>;
}

/**
 * Service for Order entity operations
 */
export class OrderService extends BaseService<Order> implements IOrderService {
  private orderRepository: OrderRepository;
  private transactionManager: PrismaTransactionManager;

  constructor() {
    super();
    this.orderRepository = new OrderRepository();
    this.transactionManager = new PrismaTransactionManager();
  }

  /**
   * Get order by ID
   */
  async getById(id: string): Promise<Order | null> {
    return this.orderRepository.findById(id);
  }

  /**
   * Get order with full details
   */
  async getOrderDetails(orderId: string): Promise<
    | (Order & {
        customer: any;
        shippingAddress: any;
        orderItems: any[];
        payments: any[];
        fulfillments: any[];
      })
    | null
  > {
    const order = await this.orderRepository.findOrderWithDetails(orderId);

    if (!order) {
      throw new VestidoError({
        name: 'OrderNotFoundError',
        message: `Order ${orderId} not found`,
      });
    }

    return order;
  }

  /**
   * Get orders for a customer
   */
  async getCustomerOrders(customerId: string): Promise<Order[]> {
    return this.orderRepository.findOrdersByCustomer(customerId);
  }

  /**
   * Update order status
   */
  async updateStatus(orderId: string, status: any): Promise<Order> {
    const order = await this.orderRepository.findById(orderId);

    if (!order) {
      throw new VestidoError({
        name: 'OrderNotFoundError',
        message: `Order ${orderId} not found`,
      });
    }

    return this.orderRepository.updateOrderStatus(orderId, status);
  }

  /**
   * Cancel an order
   */
  async cancelOrder(orderId: string, reason: string): Promise<boolean> {
    const order = await this.orderRepository.findById(orderId);

    if (!order) {
      throw new VestidoError({
        name: 'OrderNotFoundError',
        message: `Order ${orderId} not found`,
      });
    }

    // Using transaction to ensure atomicity
    try {
      await this.transactionManager.executeTransaction(async (tx) => {
        // Update order status
        await this.orderRepository.updateOrderStatus(orderId, 'CANCELLED', tx);

        // Create order log
        // Note: We'd need an OrderLogRepository to properly implement this
        // This is just for illustration
        // await orderLogRepository.create({
        //   orderId,
        //   logType: 'USER_ORDER_CANCELLATION',
        //   rawData: { reason }
        // }, tx);
      });

      return true;
    } catch (error) {
      throw new VestidoError({
        name: 'OrderCancellationFailed',
        message: `Error cancelling order ${orderId}`,
        context: { error },
      });
    }
  }
}

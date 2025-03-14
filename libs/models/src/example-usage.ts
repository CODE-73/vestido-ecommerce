/**
 * EXAMPLE FILE - Shows how to use the new repository/service pattern
 * This file is for demonstration only and not meant to be used in production
 */

import { VestidoError } from '@vestido-ecommerce/utils';
import { ServiceFactory } from './services/service-factory';
import { PrismaTransactionManager } from './repositories/prisma/prisma-transaction-manager';

/**
 * Example of a service that would live in another library (like libs/orders)
 * but now uses our repository/service layer instead of direct Prisma usage
 */
export async function cancelOrder(data: { orderId: string; reason: string }): Promise<boolean> {
  const { orderId, reason } = data;
  
  try {
    // Get services from factory
    const orderService = ServiceFactory.getOrderService();
    
    // The service handles all validation and business logic
    return orderService.cancelOrder(orderId, reason);
  } catch (error) {
    console.error('Error cancelling order:', error);
    throw new VestidoError({
      name: 'OrderCancellationFailed',
      message: `Error cancelling order ${orderId}`,
      context: { error }
    });
  }
}

/**
 * Example of a service that requires multiple repositories in a transaction
 */
export async function validateAndApplyCoupon(
  orderId: string, 
  couponCode: string
): Promise<{ discount: number; finalTotal: number }> {
  try {
    // Get services
    const orderService = ServiceFactory.getOrderService();
    const couponService = ServiceFactory.getCouponService();
    
    // Get transaction manager
    const transactionManager = new PrismaTransactionManager();
    
    // Execute operations in a transaction
    return await transactionManager.executeTransaction(async (tx) => {
      // Validate the coupon (throws error if invalid)
      const coupon = await couponService.validateCoupon(couponCode);
      
      // Get order details
      const orderDetails = await orderService.getOrderDetails(orderId);
      
      if (!orderDetails) {
        throw new VestidoError({
          name: 'OrderNotFoundError',
          message: `Order ${orderId} not found`
        });
      }
      
      // Calculate discount
      let discount = 0;
      if (coupon.discountType === 'PERCENTAGE') {
        discount = orderDetails.totalPrice * (coupon.discountPercent / 100);
      } else {
        discount = coupon.discountAmount;
      }
      
      // Create calculations
      const finalTotal = orderDetails.totalPrice - discount;
      
      // Note: In a real implementation, we would update the order with discount info
      // await orderRepository.update(orderId, { 
      //   couponCode: couponCode,
      //   totalDiscount: discount,
      //   grandTotal: finalTotal
      // }, tx);
      
      return {
        discount,
        finalTotal
      };
    });
  } catch (error) {
    console.error('Error applying coupon:', error);
    throw new VestidoError({
      name: 'CouponApplicationFailed',
      message: `Error applying coupon ${couponCode} to order ${orderId}`,
      context: { error }
    });
  }
}
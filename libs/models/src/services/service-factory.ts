import { ICouponService, CouponService } from './coupon/coupon-service';
import { IOrderService, OrderService } from './order/order-service';

/**
 * Factory for creating service instances
 * This provides a centralized way to access services
 */
export class ServiceFactory {
  private static orderService: IOrderService;
  private static couponService: ICouponService;

  /**
   * Get the OrderService instance
   */
  static getOrderService(): IOrderService {
    if (!this.orderService) {
      this.orderService = new OrderService();
    }
    return this.orderService;
  }

  /**
   * Get the CouponService instance
   */
  static getCouponService(): ICouponService {
    if (!this.couponService) {
      this.couponService = new CouponService();
    }
    return this.couponService;
  }
}
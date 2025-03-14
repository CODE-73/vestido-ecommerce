import { Coupon } from '@prisma/client';

import { VestidoError } from '@vestido-ecommerce/utils';

import { CouponRepository } from '../../repositories/prisma/repositories/coupon-repository';
import { BaseService } from '../base-service';

/**
 * Interface for CouponService
 */
export interface ICouponService extends BaseService<Coupon> {
  getCouponByCode(code: string): Promise<Coupon | null>;
  getActiveCouponByCode(code: string): Promise<Coupon | null>;
  listActiveCoupons(): Promise<Coupon[]>;
  validateCoupon(code: string): Promise<Coupon>;
  createCoupon(data: any): Promise<Coupon>;
  updateCoupon(id: string, data: any): Promise<Coupon>;
  toggleCouponStatus(id: string, enabled: boolean): Promise<Coupon>;
}

/**
 * Service for Coupon entity operations
 */
export class CouponService
  extends BaseService<Coupon>
  implements ICouponService
{
  private couponRepository: CouponRepository;

  constructor() {
    super();
    this.couponRepository = new CouponRepository();
  }

  /**
   * Get coupon by ID
   */
  async getById(id: string): Promise<Coupon | null> {
    return this.couponRepository.findById(id);
  }

  /**
   * Get coupon by code
   */
  async getCouponByCode(code: string): Promise<Coupon | null> {
    return this.couponRepository.findByCode(code);
  }

  /**
   * Get active coupon by code
   */
  async getActiveCouponByCode(code: string): Promise<Coupon | null> {
    return this.couponRepository.findActiveCouponByCode(code);
  }

  /**
   * List all active coupons
   */
  async listActiveCoupons(): Promise<Coupon[]> {
    return this.couponRepository.listActiveCoupons();
  }

  /**
   * Validate a coupon code
   */
  async validateCoupon(code: string): Promise<Coupon> {
    const coupon = await this.couponRepository.findActiveCouponByCode(code);

    if (!coupon) {
      throw new VestidoError({
        name: 'CouponInvalidError',
        message: `Coupon ${code} is invalid or inactive`,
      });
    }

    const now = new Date();
    if (now < coupon.fromDate || now > coupon.toDate) {
      throw new VestidoError({
        name: 'CouponExpiredError',
        message: `Coupon ${code} is expired or not yet active`,
      });
    }

    if (!coupon.enabled) {
      throw new VestidoError({
        name: 'CouponDisabledError',
        message: `Coupon ${code} is disabled`,
      });
    }

    return coupon;
  }

  /**
   * Create a new coupon
   */
  async createCoupon(data: any): Promise<Coupon> {
    // Calculate if coupon should be active
    const isActive =
      data.enabled &&
      new Date(data.fromDate) <= new Date() &&
      new Date(data.toDate) >= new Date();

    // Check if an active coupon with the same code already exists
    const existingActiveCoupon =
      await this.couponRepository.findActiveCouponByCode(data.coupon);

    if (existingActiveCoupon && isActive) {
      throw new VestidoError({
        name: 'ErrorActiveCouponAlreadyExist',
        message: `CouponCode ${data.coupon} is already exist and active`,
      });
    }

    return this.couponRepository.create({
      ...data,
      active: isActive,
    });
  }

  /**
   * Update an existing coupon
   */
  async updateCoupon(id: string, data: any): Promise<Coupon> {
    const coupon = await this.couponRepository.findById(id);

    if (!coupon) {
      throw new VestidoError({
        name: 'CouponNotFoundError',
        message: `Coupon with ID ${id} not found`,
      });
    }

    // Calculate if coupon should be active after update
    const isActive =
      data.enabled &&
      new Date(data.fromDate) <= new Date() &&
      new Date(data.toDate) >= new Date();

    return this.couponRepository.update(id, {
      ...data,
      active: isActive,
    });
  }

  /**
   * Toggle coupon enabled/disabled status
   */
  async toggleCouponStatus(id: string, enabled: boolean): Promise<Coupon> {
    const coupon = await this.couponRepository.findById(id);

    if (!coupon) {
      throw new VestidoError({
        name: 'CouponNotFoundError',
        message: `Coupon with ID ${id} not found`,
      });
    }

    // Calculate if coupon should be active
    const isActive =
      enabled && coupon.fromDate <= new Date() && coupon.toDate >= new Date();

    return this.couponRepository.update(id, {
      enabled,
      active: isActive,
    });
  }
}

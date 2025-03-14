import { Coupon, Prisma } from '@prisma/client';

import { PrismaRepository } from '../prisma-repository';

/**
 * Repository for Coupon entity
 */
export class CouponRepository extends PrismaRepository<
  Coupon,
  Prisma.CouponCreateInput,
  Prisma.CouponUpdateInput
> {
  protected modelName = 'coupon';

  /**
   * Find coupon by code
   */
  async findByCode(
    code: string,
    transactionContext?: unknown,
  ): Promise<Coupon | null> {
    const prisma = this.getPrisma(transactionContext);

    return prisma.coupon.findFirst({
      where: { coupon: code },
    });
  }

  /**
   * Find active coupon by code
   */
  async findActiveCouponByCode(
    code: string,
    transactionContext?: unknown,
  ): Promise<Coupon | null> {
    const prisma = this.getPrisma(transactionContext);

    return prisma.coupon.findFirst({
      where: {
        coupon: code,
        active: true,
      },
    });
  }

  /**
   * List active coupons
   */
  async listActiveCoupons(transactionContext?: unknown): Promise<Coupon[]> {
    const prisma = this.getPrisma(transactionContext);

    return prisma.coupon.findMany({
      where: { active: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  /**
   * Update coupon active status
   */
  async updateActiveStatus(
    id: string,
    active: boolean,
    transactionContext?: unknown,
  ): Promise<Coupon> {
    const prisma = this.getPrisma(transactionContext);

    return prisma.coupon.update({
      where: { id },
      data: { active },
    });
  }
}

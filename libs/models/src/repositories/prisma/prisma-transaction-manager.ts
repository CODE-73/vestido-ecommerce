import { getPrismaClient } from '../../client';
import { TransactionManager } from '../transaction-manager';

/**
 * Prisma implementation of TransactionManager
 * Handles database transactions using Prisma's transaction API
 */
export class PrismaTransactionManager extends TransactionManager {
  /**
   * Execute a function within a Prisma transaction
   * @param callback Function to execute within the transaction
   * @returns Result of the callback function
   */
  async executeTransaction<T>(
    callback: (context: unknown) => Promise<T>,
  ): Promise<T> {
    const prisma = getPrismaClient();

    return prisma.$transaction(async (prismaTransaction) => {
      return callback(prismaTransaction);
    });
  }
}

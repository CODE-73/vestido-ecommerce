import { PrismaClient } from '@prisma/client';

import { getPrismaClient, PrismaTransactionalClient } from '../../client';
import { FindManyParams, IRepository } from '../base-repository';

/**
 * Base Prisma repository implementation
 * Implements common CRUD operations using Prisma
 */
export abstract class PrismaRepository<T, CreateInput, UpdateInput>
  implements IRepository<T, CreateInput, UpdateInput>
{
  protected abstract modelName: string;

  protected getPrisma(
    transactionContext?: unknown,
  ): PrismaClient | PrismaTransactionalClient {
    if (transactionContext) {
      return transactionContext as PrismaTransactionalClient;
    }
    return getPrismaClient();
  }

  async findById(id: string, transactionContext?: unknown): Promise<T | null> {
    const prisma = this.getPrisma(transactionContext);
    return prisma[this.modelName].findUnique({
      where: { id },
    }) as Promise<T | null>;
  }

  async findMany(
    params: FindManyParams,
    transactionContext?: unknown,
  ): Promise<T[]> {
    const prisma = this.getPrisma(transactionContext);
    return prisma[this.modelName].findMany(params) as Promise<T[]>;
  }

  async count(
    where: Record<string, any>,
    transactionContext?: unknown,
  ): Promise<number> {
    const prisma = this.getPrisma(transactionContext);
    return prisma[this.modelName].count({ where });
  }

  async create(data: CreateInput, transactionContext?: unknown): Promise<T> {
    const prisma = this.getPrisma(transactionContext);
    return prisma[this.modelName].create({ data }) as Promise<T>;
  }

  async update(
    id: string,
    data: UpdateInput,
    transactionContext?: unknown,
  ): Promise<T> {
    const prisma = this.getPrisma(transactionContext);
    return prisma[this.modelName].update({
      where: { id },
      data,
    }) as Promise<T>;
  }

  async delete(id: string, transactionContext?: unknown): Promise<T> {
    const prisma = this.getPrisma(transactionContext);
    return prisma[this.modelName].delete({
      where: { id },
    }) as Promise<T>;
  }
}

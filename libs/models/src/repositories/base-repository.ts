/**
 * Repository interface for database operations
 * Generic types:
 * T - Entity type (return type)
 * CreateInput - Data needed to create an entity
 * UpdateInput - Data needed to update an entity
 */
export interface IRepository<T, CreateInput, UpdateInput> {
  findById(id: string, transactionContext?: unknown): Promise<T | null>;
  findMany(params: FindManyParams, transactionContext?: unknown): Promise<T[]>;
  count(where: Record<string, any>, transactionContext?: unknown): Promise<number>;
  create(data: CreateInput, transactionContext?: unknown): Promise<T>;
  update(id: string, data: UpdateInput, transactionContext?: unknown): Promise<T>;
  delete(id: string, transactionContext?: unknown): Promise<T>;
}

/**
 * Parameters for finding multiple records
 */
export interface FindManyParams {
  where?: Record<string, any>;
  skip?: number;
  take?: number;
  orderBy?: Record<string, 'asc' | 'desc'>;
  include?: Record<string, boolean | object>;
}
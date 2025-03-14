/**
 * Base interface for all services
 * Generic type T is the entity type returned by the service
 */
export interface IService<T> {
  /**
   * Get entity by ID
   */
  getById(id: string): Promise<T | null>;
}

/**
 * Base service with common functionality
 * Generic type T is the entity type
 */
export abstract class BaseService<T> implements IService<T> {
  /**
   * Get entity by ID
   */
  abstract getById(id: string): Promise<T | null>;
}

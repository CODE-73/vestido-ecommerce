/**
 * Interface for transaction manager
 */
export interface ITransactionManager {
  /**
   * Execute a function within a transaction
   * @param callback Function to execute within transaction
   * @returns Result of the callback function
   */
  executeTransaction<T>(callback: (context: unknown) => Promise<T>): Promise<T>;
}

/**
 * Transaction manager abstraction to handle database transactions
 */
export abstract class TransactionManager implements ITransactionManager {
  /**
   * Execute operations within a transaction
   * @param callback Function to execute within the transaction 
   * @returns Result of the callback function
   */
  abstract executeTransaction<T>(callback: (context: unknown) => Promise<T>): Promise<T>;
}
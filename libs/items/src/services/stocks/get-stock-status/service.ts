import { StockStatus } from '@prisma/client';

export function getStockStatus(stockBalance: number): StockStatus {
  if (stockBalance > 20) {
    return 'AVAILABLE';
  } else if (stockBalance > 0) {
    return 'LIMITED_STOCK';
  }
  return 'OUT_OF_STOCK';
}

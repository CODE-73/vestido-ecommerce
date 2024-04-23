// import { SortParam } from '../../types';
import { Item } from '@prisma/client';

// type ItemListSortParams = SortParam<Item>;

export type ListItemRequest = {
  filters?: ItemListFilterParams;
  // sort?: ItemListSortParams;
  page?: number;
  pageSize?: number;
};

export type ItemListResponse = {
  data: Item[];

  /** The total number of customers that match the request criteria. */
  // count: number;
};

/**
 * Represents the filter parameters for a customer list.
 */
type ItemListFilterParams = {
  // name?: string;
  // mobile?: string;
  // email?: string;
  /** Searches name OR mobile OR email */
  q?: string;
};

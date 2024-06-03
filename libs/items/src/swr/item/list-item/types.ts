// import { SortParam } from '../../types';
export { type ListItemResponse } from '../../../services/items/list-item/types';

// type ItemListSortParams = SortParam<Item>;

export type ListItemRequest = {
  filters?: ItemListFilterParams;
  // sort?: ItemListSortParams;
  page?: number;
  pageSize?: number;
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

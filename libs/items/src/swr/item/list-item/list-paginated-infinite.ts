import useSWRInfinite from 'swr/infinite';

import { useAuth } from '@vestido-ecommerce/auth/client';

import { ListItemRequest } from '../../../services/items/list-item/types';
import { ListItemSWRKeys } from '../keys';
import { getItemList } from './service';
import { ListItemResponse } from './types';

const PAGE_SIZE = 20;

export function usePaginatedItemsInfinite(
  initialArgs?: Omit<ListItemRequest, 'offset' | 'limit'>,
) {
  const { authHeaders } = useAuth();

  // Generate SWR cache key per page
  const getKey = (
    pageIndex: number,
    previousPageData: ListItemResponse | null,
  ) => {
    if (previousPageData && previousPageData.length < PAGE_SIZE) return null; // no more pages

    const query = {
      ...(initialArgs ?? {}),
      limit: PAGE_SIZE,
      offset: pageIndex * PAGE_SIZE,
    };

    return [ListItemSWRKeys.ITEM, ListItemSWRKeys.LIST, JSON.stringify(query)];
  };

  const { data, error, size, setSize /*isValidating*/ } = useSWRInfinite<
    ListItemResponse,
    Error
  >(getKey, (key) => {
    const query = JSON.parse(key[2]); // extract query object
    return getItemList(query, authHeaders);
  });

  // Flatten pages into one array
  const items = data?.flat() ?? [];

  const isLoadingInitialData = !data && !error;
  const isLoadingMore =
    isLoadingInitialData ||
    (size > 0 && data && typeof data[size - 1] === 'undefined');
  const hasMore = data?.[data.length - 1]?.length === PAGE_SIZE;

  const loadMore = () => {
    if (hasMore && !isLoadingMore) {
      setSize(size + 1);
    }
  };

  return {
    items,
    isLoadingMore,
    isLoadingInitialData,
    error,
    loadMore,
    hasMore,
  };
}

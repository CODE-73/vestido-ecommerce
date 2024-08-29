import { getItemDetails } from './service';

export type ItemDetails = NonNullable<
  Awaited<ReturnType<typeof getItemDetails>>
>;

export type ItemDetailsResponse = {
  data: ItemDetails | null;
};

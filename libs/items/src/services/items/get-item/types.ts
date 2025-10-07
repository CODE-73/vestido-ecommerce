import { getItemDetails } from './service';

export type ItemDetailsResult = NonNullable<
  Awaited<ReturnType<typeof getItemDetails>>
>;

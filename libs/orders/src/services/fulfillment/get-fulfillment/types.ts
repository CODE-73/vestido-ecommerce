import { getFulfillment } from './service';

export type FulfillmentDetailsResult = Awaited<
  ReturnType<typeof getFulfillment>
>;

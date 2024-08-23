import { getFulfillment } from './service';

export type FulfillmentDetailsResponse = {
  data: Awaited<ReturnType<typeof getFulfillment>>;
};

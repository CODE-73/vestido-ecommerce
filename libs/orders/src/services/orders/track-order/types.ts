import { trackOrder } from './service';

export type trackOrderResult = {
  data: Awaited<ReturnType<typeof trackOrder>>;
};

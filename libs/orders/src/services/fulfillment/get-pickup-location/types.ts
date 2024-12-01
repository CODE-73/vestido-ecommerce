import { getPickupLoc } from './service';

export type PickupLocationResponse = {
  data: Awaited<ReturnType<typeof getPickupLoc>>;
};

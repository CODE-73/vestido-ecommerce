import { getOrder } from './service';

export type GetOrderResponse = { data: Awaited<ReturnType<typeof getOrder>> };

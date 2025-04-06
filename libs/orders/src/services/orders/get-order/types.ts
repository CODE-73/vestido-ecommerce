import { getOrder } from './service';

export type GetOrderResult = Awaited<ReturnType<typeof getOrder>>;

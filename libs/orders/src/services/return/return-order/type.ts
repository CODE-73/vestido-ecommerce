import { returnOrder } from './service';
import { returnOrderSchemaType } from './zod';

export type returnOrderRequest = returnOrderSchemaType;

export type returnOrderResponse = {
  data: Awaited<ReturnType<typeof returnOrder>>;
};

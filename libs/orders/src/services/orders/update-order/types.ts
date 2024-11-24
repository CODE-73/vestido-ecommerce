import { updateOrder } from './service';
import { UpdateOrderSchemaType } from './zod';

export type UpdateOrderArgs = UpdateOrderSchemaType;
export type UpdateOrderResults = Awaited<ReturnType<typeof updateOrder>>;

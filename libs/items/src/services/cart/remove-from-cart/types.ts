import { removeFromCart } from './services';
import { RemoveFromCartSchemaType } from './zod';

export type RemoveFromCartArgs = RemoveFromCartSchemaType;

export type RemoveFromCartResult = Awaited<ReturnType<typeof removeFromCart>>;

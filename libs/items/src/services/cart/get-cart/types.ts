import { listCartItems } from './service';

export type CartItemResult = Awaited<ReturnType<typeof listCartItems>>;

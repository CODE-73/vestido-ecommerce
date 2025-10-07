import { listWishlistItems } from './service';

export type WishlistItemResult = Awaited<ReturnType<typeof listWishlistItems>>;

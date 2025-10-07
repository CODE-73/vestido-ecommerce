import { variantDetails } from './service';

export type VariantDetailsResult = Awaited<ReturnType<typeof variantDetails>>;

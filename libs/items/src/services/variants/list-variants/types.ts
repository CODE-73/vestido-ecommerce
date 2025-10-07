import { listVariants } from './service';

export type VariantListResult = Awaited<ReturnType<typeof listVariants>>;

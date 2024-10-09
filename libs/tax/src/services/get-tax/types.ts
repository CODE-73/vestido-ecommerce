import { getTax } from './service';

export type GetTaxResults = Awaited<ReturnType<typeof getTax>>;

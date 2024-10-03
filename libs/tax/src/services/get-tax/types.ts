import { getTax } from './service';

export type getTaxResults = Awaited<ReturnType<typeof getTax>>;

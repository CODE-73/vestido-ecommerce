import { categoryDetails } from './service';

export type CategoryDetailsResult = Awaited<ReturnType<typeof categoryDetails>>;

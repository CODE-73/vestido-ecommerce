import { getAttribute } from './service';

// export type GetAttributeArgs = {};
export type GetAttributeResult = Awaited<ReturnType<typeof getAttribute>>;

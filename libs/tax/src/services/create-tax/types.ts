import { type createTax } from './service';
import { CreateTaxSchemaType } from './zod';

export type CreateTaxArgs = CreateTaxSchemaType;
export type CreateTaxResult = Awaited<ReturnType<typeof createTax>>;

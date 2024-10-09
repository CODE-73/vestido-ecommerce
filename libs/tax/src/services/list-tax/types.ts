import { type listTax } from './service';
import { ListTaxSchemaType } from './zod';

export type ListTaxArgs = ListTaxSchemaType;
export type ListTaxResult = Awaited<ReturnType<typeof listTax>>;

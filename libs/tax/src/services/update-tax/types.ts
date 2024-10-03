import { type updateTax } from './service';
import { UpdateTaxSchemaType } from './zod';

export type UpdateTaxArgs = UpdateTaxSchemaType;
export type UpdateTaxResult = Awaited<ReturnType<typeof updateTax>>;

import { createVariant } from './service';
import { CreateVariantSchemaType } from './zod';

export type CreateVariantArgs = CreateVariantSchemaType;
// export type CreateVariantResponse = ItemVariantWithAttributes;
export type CreateVariantResult = Awaited<ReturnType<typeof createVariant>>;

import { updateVariant } from './service';
import { UpdateVariantSchemaType } from './zod';

export type UpdateVariantArgs = UpdateVariantSchemaType;

export type UpdateVariantResult = Awaited<ReturnType<typeof updateVariant>>;

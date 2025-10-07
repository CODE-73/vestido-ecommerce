import { VestidoResponse } from '@vestido-ecommerce/utils';
import { CreateVariantArgs, CreateVariantResult, UpdateVariantArgs, UpdateVariantResult } from 'libs/items/src/services';

export type VariantUpsertRequest = (| CreateVariantArgs | UpdateVariantArgs) & { id?: string };

export type VariantUpsertResponse = VestidoResponse<CreateVariantResult | UpdateVariantResult>
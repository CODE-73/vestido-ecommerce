import { VestidoResponse } from '@vestido-ecommerce/utils';
import { CreateAttributeArgs, CreateAttributeResult, UpdateAttributeArgs, UpdateAttributeResult } from 'libs/items/src/services';

export type UpsertAttributeRequest = (
  | CreateAttributeArgs 
  | UpdateAttributeArgs
) & { id?: string };

export type UpsertAttributeResponse = VestidoResponse<CreateAttributeResult | UpdateAttributeResult>
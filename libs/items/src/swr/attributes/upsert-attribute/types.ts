import { VestidoResponse } from '@vestido-ecommerce/utils';

import {
  CreateAttributeArgs,
  CreateAttributeResult,
  UpdateAttributeArgs,
  UpdateAttributeResult,
} from '../../../services';

export type UpsertAttributeRequest = (
  | CreateAttributeArgs
  | UpdateAttributeArgs
) & { id?: string };

export type UpsertAttributeResponse = VestidoResponse<
  CreateAttributeResult | UpdateAttributeResult
>;

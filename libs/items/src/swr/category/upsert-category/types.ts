import { VestidoResponse } from '@vestido-ecommerce/utils';

import {
  CreateCategoryArgs,
  CreateCategoryResult,
  UpdateCategoryArgs,
  UpdateCategoryResult,
} from '../../../services';

export type CategoryUpsertRequest = (
  | CreateCategoryArgs
  | UpdateCategoryArgs
) & { id?: string };

export type CategoryUpsertResponse = VestidoResponse<
  CreateCategoryResult | UpdateCategoryResult
>;

import { VestidoResponse } from '@vestido-ecommerce/utils';

import {
  CreateItemResult,
  ItemUpsertSchemaType,
  UpdateItemResult,
} from '../../../services';

export type ItemUpsertRequest = ItemUpsertSchemaType;

export type ItemUpsertResponse =
  | VestidoResponse<CreateItemResult>
  | VestidoResponse<UpdateItemResult>;

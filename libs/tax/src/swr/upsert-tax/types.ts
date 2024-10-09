import { VestidoResponse } from '@vestido-ecommerce/utils';

import { CreateTaxSchemaType } from '../../services';
import { GetTaxResults } from '../../services/get-tax/types';
import { UpdateTaxSchemaType } from '../../services/update-tax/zod';

export type UpsertTaxResponse = VestidoResponse<GetTaxResults>;
export type UpsertTaxRequest = UpdateTaxSchemaType | CreateTaxSchemaType;

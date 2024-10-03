import { VestidoResponse } from '@vestido-ecommerce/utils';

import { CreateTaxSchemaType } from '../../services';
import { getTaxResults } from '../../services/get-tax/types';
import { UpdateTaxSchemaType } from '../../services/update-tax/zod';

export type UpsertTaxResponse = VestidoResponse<getTaxResults>;
export type UpsertTaxRequest = UpdateTaxSchemaType | CreateTaxSchemaType;

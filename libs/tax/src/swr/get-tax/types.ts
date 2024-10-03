import { VestidoResponse } from '@vestido-ecommerce/utils';

import { getTaxResults } from '../../services/get-tax/types';

export type GetTaxResponse = VestidoResponse<getTaxResults>;

import { VestidoResponse } from '@vestido-ecommerce/utils';

import { GetStockBalanceArgs, GetStockBalanceResult } from '../../../services';

export type GetStockBalanceRequest = GetStockBalanceArgs;
export type GetStockBalanceResponse = VestidoResponse<GetStockBalanceResult>;

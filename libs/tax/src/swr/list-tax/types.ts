import { VestidoResponse } from '@vestido-ecommerce/utils';

import { ListTaxArgs, ListTaxResult } from '../../services';

export type ListTaxRequest = ListTaxArgs;
export type ListTaxResponse = VestidoResponse<ListTaxResult>;

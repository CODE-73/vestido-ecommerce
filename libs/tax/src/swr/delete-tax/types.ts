import { VestidoResponse } from '@vestido-ecommerce/utils';

export type DeleteTaxRequest = { taxId: string };
export type DeleteTaxResponse = VestidoResponse<true>;

import { VestidoResponse } from '@vestido-ecommerce/utils';
import {
  CalculateTotalArgs,
  CalculateTotalResult,
} from 'libs/orders/src/services';

export type CalculateTotalRequest = CalculateTotalArgs;
export type CalculateTotalResponse = VestidoResponse<CalculateTotalResult>;

import { VestidoResponse } from '@vestido-ecommerce/utils';

import { ReconcileStockArgs, ReconcileStockResult } from '../../../services';

export type ReconcileStockRequest = ReconcileStockArgs;
export type ReconcileStockResponse = VestidoResponse<ReconcileStockResult>;

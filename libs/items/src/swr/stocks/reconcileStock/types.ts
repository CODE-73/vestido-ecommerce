import { VestidoResponse } from "@vestido-ecommerce/utils";
import { ReconcileStockArgs, ReconcileStockResult } from "libs/items/src/services";

export type  ReconcileStockRequest = ReconcileStockArgs;
export type ReconcileStockResponse = VestidoResponse<ReconcileStockResult>;


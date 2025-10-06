import { VestidoResponse } from "@vestido-ecommerce/utils";
import { GetStockBalanceArgs, GetStockBalanceResult } from "libs/items/src/services";

export type GetStockBalanceResponse = VestidoResponse<GetStockBalanceResult>;
export type GetStockBalanceRequest = GetStockBalanceArgs;
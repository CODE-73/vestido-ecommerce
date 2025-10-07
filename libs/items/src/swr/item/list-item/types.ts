import { VestidoResponse } from '@vestido-ecommerce/utils';

import { ListItemArgs, ListItemResult } from '../../../services';

export type ListItemRequest = ListItemArgs;

export type ListItemResponse = VestidoResponse<ListItemResult>;

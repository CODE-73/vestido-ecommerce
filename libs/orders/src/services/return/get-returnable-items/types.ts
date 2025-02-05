import { VestidoResponse } from '@vestido-ecommerce/utils';

import { getReturnableItems } from './service';

export type GetReturnableitemsResponse = Awaited<
  ReturnType<typeof getReturnableItems>
>;

export type GetReturnableitemsSWRResponse =
  VestidoResponse<GetReturnableitemsResponse>;

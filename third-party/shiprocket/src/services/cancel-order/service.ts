import { VestidoError } from '@vestido-ecommerce/utils';

import { invokeShiprocketAPI } from '../invoke-shiprocket-api';

export async function cancelShiprocketOrder(data: string) {
  const body = {
    ids: [data],
  };

  try {
    const response = await invokeShiprocketAPI('/orders/cancel', {
      method: 'POST',
      body: { ...body },
    });
    return response;
  } catch (e) {
    if (e instanceof VestidoError) {
      e.name = 'ShiprocketCancelOrderFailed';
    }
    throw e;
  }
}

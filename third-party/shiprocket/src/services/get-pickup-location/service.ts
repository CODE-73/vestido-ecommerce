import { VestidoError } from '@vestido-ecommerce/utils';

import { invokeShiprocketAPI } from '../invoke-shiprocket-api';

export async function getShiprocketPickupLocation() {
  try {
    const response = await invokeShiprocketAPI('/settings/company/pickup', {
      method: 'GET',
    });
    return response;
  } catch (e) {
    if (e instanceof VestidoError) {
      e.name = 'ShipRocketGetPickupLocationFailed';
    }
    throw e;
  }
}

import { VestidoError } from '@vestido-ecommerce/utils';

import { invokeShiprocketAPI } from '../invoke-shiprocket-api';

export async function trackAWB(awbCodes: string[]) {
  try {
    const response = await invokeShiprocketAPI('/courier/track/awbs', {
      method: 'POST',
      body: { awbs: awbCodes },
    });
    return response;
  } catch (e) {
    if (e instanceof VestidoError) {
      e.name = 'ShipRocketTrackOrderFailed';
    }
    throw e;
  }
}

import { invokeShiprocketAPI } from '../invoke-shiprocket-api';

export async function cancelShiprocketOrder(data: number) {
  const body = {
    ids: [data],
  };

  const response = await invokeShiprocketAPI('/orders/cancel', {
    method: 'POST',
    body: { ...body },
  });

  return response;
}

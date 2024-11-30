import { getPrismaClient } from '@vestido-ecommerce/models';
import { VestidoError } from '@vestido-ecommerce/utils';

import { shiprocketWebhookRequest } from './types';

const SHIPROCKET_WEBHOOK_TOKEN = process.env[
  'SHIPROCKET_WEBHOOK_TOKEN'
] as string;

export async function handleShiprocketWebhook(data: shiprocketWebhookRequest) {
  const prisma = getPrismaClient();

  const incomingToken = data.token;

  if (!SHIPROCKET_WEBHOOK_TOKEN) {
    throw new VestidoError({
      name: 'ShiprocketWebhookTokenNotSetError',
      message: 'Shiprocket Webhook Token is not set',
    });
  }

  if (SHIPROCKET_WEBHOOK_TOKEN !== incomingToken) {
    throw new VestidoError({
      name: 'ShiprocketWebhookTokenInvalidError',
      message: 'Invalid Webhook token',
    });
  }

  await prisma.$transaction(async (prisma) => {
    await prisma.fulfillmentLog.create({
      data: {
        fullfillmentId: data.order_id,
        logType: 'SHIPROCKET_WEBHOOK',
        rawData: data,
      },
    });

    const fulfillmentDetails = await prisma.fulfillment.updateMany({
      where: {
        shiprocket_order_id: String(data.sr_order_id),
      },
      data: {
        tracking: data.awb,
      },
    });
    return fulfillmentDetails;
  });
}

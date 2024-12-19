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

  const fulfillment = await prisma.fulfillment.findFirst({
    where: {
      shiprocket_order_id: String(data.sr_order_id),
    },
  });

  if (!fulfillment) {
    throw new VestidoError({
      name: 'WebhookFulfillmentNotFound',
      message: `Fulfillment not found for ${data.sr_order_id} from ShipRocket Request`,
      // Shiprocket Webhook expects 200 status code even on unknown fulfillment
      // This is required to pass their Webhook validation
      // We get notified of this error on Sentry.
      httpStatus: 200,
      context: {
        data,
      },
    });

    return null;
  }

  await prisma.$transaction(async (prisma) => {
    await prisma.fulfillmentLog.create({
      data: {
        fullfillmentId: fulfillment.id,
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

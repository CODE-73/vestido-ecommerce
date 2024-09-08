import { getPrismaClient } from '@vestido-ecommerce/models';

import { shiprocketWebhookRequest } from './types';

export async function handleShiprocketWebhook(data: shiprocketWebhookRequest) {
  const prisma = getPrismaClient();

  const webhookSignature = data.token;

  const generatedSignature =
    '0578fe6ea8044445f48b3db8f6c90e12949bbb85fd403c275bb86409922a4c08';

  if (generatedSignature !== webhookSignature) {
    throw new Error('Invalid Webhook token');
  }

  const result = await prisma.$transaction(async (prisma) => {
    const fulfillmentDetails = await prisma.fulfillment.updateMany({
      where: {
        shiprocket_order_id: data.sr_order_id,
      },
      data: {
        tracking: data.awb,
      },
    });
    return fulfillmentDetails;
  });
  console.log('Result:', result);
}

import { sendSMS, SMSSenderID, SMSTemplate } from '@vestido-ecommerce/fast2sms';
import { getPrismaClient } from '@vestido-ecommerce/models';
import { VestidoError } from '@vestido-ecommerce/utils';

const IS_DEVELOPMENT = process.env['NODE_ENV'] === 'development';

import { shiprocketWebhookRequest } from './types';

const SHIPROCKET_WEBHOOK_TOKEN = process.env[
  'SHIPROCKET_WEBHOOK_TOKEN'
] as string;

export type ShiprocketWebhookTarget = {
  type: 'Order' | 'Fulfillment' | 'Return';
  id: string;
};

export async function handleShiprocketWebhook(
  data: shiprocketWebhookRequest,
): Promise<ShiprocketWebhookTarget | null> {
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
    include: {
      fulfillmentItems: true,
      order: {
        include: {
          shippingAddress: true,
          customer: true,
        },
      },
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
  }

  await prisma.webhookLog.create({
    data: {
      logType: 'SHIPROCKET',
      rawData: data,
    },
  });

  if (!data.is_return) {
    await prisma.$transaction(async (prisma) => {
      await prisma.fulfillment.updateMany({
        where: {
          shiprocket_order_id: String(data.sr_order_id),
        },
        data: {
          tracking: data.awb,
          ...((data.current_status === 'IN TRANSIT' || 'PICKED UP') && {
            status: 'IN_TRANSIT',
          }),
          ...(data.current_status === 'OUT FOR DELIVERY' && {
            status: 'OUT_FOR_DELIVERY',
          }),
          ...(data.current_status === 'DELIVERED' && { status: 'DELIVERED' }),
          ...(data.delivered_date && { deliveredDate: data.delivered_date }),
        },
      });

      const isShipped = await prisma.fulfillmentLog.findFirst({
        where: {
          fullfillmentId: fulfillment.id,
          logType: 'SHIPROCKET_WEBHOOK_FULFILLMENT_SHIPPED',
        },
      });

      if (!isShipped && (data.current_status === 'IN_TRANSIT' || 'PICKED UP')) {
        await prisma.fulfillmentLog.create({
          data: {
            fullfillmentId: fulfillment.id,
            logType: 'SHIPROCKET_WEBHOOK_FULFILLMENT_SHIPPED',
            rawData: data,
          },
        });
      } else {
        await prisma.fulfillmentLog.create({
          data: {
            fullfillmentId: fulfillment.id,
            logType: 'SHIPROCKET_WEBHOOK_FULFILLMENT',
            rawData: data,
          },
        });
      }

      //Send SMS
      if (!IS_DEVELOPMENT) {
        const totalItems = fulfillment.fulfillmentItems
          .reduce((sum, item) => sum + item.quantity, 0)
          .toString();

        const mobile = fulfillment.order.shippingAddress.mobile ?? '';

        if (
          !isShipped &&
          (data.current_status === 'IN_TRANSIT' || 'PICKED UP')
        ) {
          try {
            if (!mobile) {
              await sendSMS({
                senderId: SMSSenderID.BVSTID,
                template: SMSTemplate.ORDER_SHIPPED_SMS,
                variables: [fulfillment.orderId, totalItems],
                recipients: [mobile],
              });
            }
          } catch (e) {
            throw new VestidoError({
              name: 'SendOTPFailed',
              message: 'Failed to send OTP',
              httpStatus: 500,
              context: {
                fulfillment,
                error: e,
              },
            });
          }
        }

        if (data.current_status === 'DELIVERED') {
          try {
            if (!mobile) {
              await sendSMS({
                senderId: SMSSenderID.BVSTID,
                template: SMSTemplate.ORDER_DELIVERED_SMS,
                variables: [totalItems, fulfillment.orderId],
                recipients: [mobile],
              });
            }
          } catch (e) {
            throw new VestidoError({
              name: 'SendOTPFailed',
              message: 'Failed to send OTP',
              httpStatus: 500,
              context: {
                fulfillment,
                error: e,
              },
            });
          }
        }
      }
      return {
        type: 'Order',
        id: data.order_id,
      };
    });
  }

  if (data.is_return) {
    await prisma.$transaction(async (prisma) => {
      await prisma.fulfillmentLog.create({
        data: {
          fullfillmentId: fulfillment.id,
          logType: 'SHIPROCKET_WEBHOOK_RETURN',
          rawData: data,
        },
      });
    });

    return {
      type: 'Fulfillment',
      id: fulfillment.id,
    };
  }

  return null;
}

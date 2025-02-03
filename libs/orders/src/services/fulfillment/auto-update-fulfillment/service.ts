import { sendSMS, SMSSenderID, SMSTemplate } from '@vestido-ecommerce/fast2sms';
import { getPrismaClient } from '@vestido-ecommerce/models';
import { trackAWB } from '@vestido-ecommerce/shiprocket';
import { VestidoError } from '@vestido-ecommerce/utils';

import { refreshOrderStatus } from '@vestido-ecommerce/orders';

export async function autoUpdateFulfillmentStatus() {
  const prisma = getPrismaClient();

  const fulfillmentsToUpdate = await prisma.fulfillment.findMany({
    where: {
      tracking: {
        not: null,
      },
      status: {
        in: ['IN_TRANSIT', 'OUT_FOR_DELIVERY'],
      },
    },
  });

  const awbCodes = fulfillmentsToUpdate.map((f) => f.tracking as string);

  const trackingDetails = await trackAWB(awbCodes);

  fulfillmentsToUpdate.map(async (f) => {
    const fulfilmentTrackDetails = trackingDetails[f.tracking as string];

    const currentStatus =
      fulfilmentTrackDetails?.tracking_data?.shipment_track?.[0]
        ?.current_status || null;

    if (currentStatus === 'OUT FOR DELIVERY') {
      const updatedFulfillment = await prisma.fulfillment.update({
        where: {
          id: f.id,
        },
        data: {
          status: 'OUT_FOR_DELIVERY',
        },
        include: {
          order: {
            include: {
              shippingAddress: true,
            },
          },
          fulfillmentItems: true,
        },
      });

      const mobile = updatedFulfillment.order.shippingAddress.mobile;
      const totalItems = updatedFulfillment.fulfillmentItems
        .reduce((sum, item) => sum + item.quantity, 0)
        .toString();
    }

    if (currentStatus === 'DELIVERED') {
      const updatedFulfillment = await prisma.fulfillment.update({
        where: {
          id: f.id,
        },
        data: {
          deliveredDate:
            fulfilmentTrackDetails.tracking_data.shipment_track[0]
              .delivered_date,
          status: 'DELIVERED',
        },
        include: {
          order: {
            include: {
              shippingAddress: true,
            },
          },
          fulfillmentItems: true,
        },
      });

      const mobile = updatedFulfillment.order.shippingAddress.mobile;
      const totalItems = updatedFulfillment.fulfillmentItems
        .reduce((sum, item) => sum + item.quantity, 0)
        .toString();

      try {
        if (mobile) {
          await sendSMS({
            senderId: SMSSenderID.BVSTID,
            template: SMSTemplate.ORDER_DELIVERED_SMS,
            variables: [
              totalItems,
              updatedFulfillment.order.order_no.toString(),
            ],
            recipients: [mobile],
          });
        }
      } catch (e) {
        throw new VestidoError({
          name: 'SendOTPFailed',
          message: 'Failed to send OTP',
          httpStatus: 500,
          context: {
            updatedFulfillment,
            error: e,
          },
        });
      }
      const refreshData = { id: f.id, type: 'fulfillmentStatus' };
      await refreshOrderStatus(refreshData);
    }
  });
}

import { getPrismaClient } from '@vestido-ecommerce/models';
import { trackAWB } from '@vestido-ecommerce/shiprocket';

export async function trackOrder(orderId: string) {
  const prisma = getPrismaClient();

  // Retrieve the fulfillments for the given orderId
  const fulfillments = await prisma.fulfillment.findMany({
    where: {
      orderId: orderId,
    },
    select: {
      id: true,
      status: true,
      tracking: true,
      dateTime: true,
      shiprocket_order_id: true,
      shipment_id: true,
    },
  });

  // Collect all tracking ids from the fulfillments that have them
  const awbCodes = fulfillments
    .filter((f) => f.tracking) // Only take fulfillments with a tracking AWB
    .map((f) => f.tracking as string);

  // If there are no AWB codes, return early
  if (awbCodes.length === 0) {
    return fulfillments.map((f) => ({
      fulfillmentId: f.id,
      status: f.status,
      tracking: f.tracking,
      dateTime: f.dateTime,
      shiprocket_order_id: f.shiprocket_order_id,
      shipment_id: f.shipment_id,
      trackingDetails: null, // No AWB, no tracking details
    }));
  }

  // Fetch tracking details for all AWB codes at once
  const trackingDetails = await trackAWB(awbCodes);

  // Map the tracking details back to the fulfillments
  const fulfillmentTrackingDetails = fulfillments.map((f) => {
    const trackingDetail = f.tracking
      ? trackingDetails[f.tracking] || null
      : null;

    return {
      fulfillmentId: f.id,
      status: f.status,
      tracking: f.tracking,
      dateTime: f.dateTime,
      shiprocket_order_id: f.shiprocket_order_id,
      shipment_id: f.shipment_id,
      trackingDetails: trackingDetail,
    };
  });

  // Return the enriched fulfillments with tracking details
  return fulfillmentTrackingDetails;
}

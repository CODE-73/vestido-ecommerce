import * as CryptoJS from 'crypto-js';

import { getPrismaClient } from '@vestido-ecommerce/models';

import { RazorpayWebhookSchemaType } from './zod';

export async function handleRazorpayWebhook(data: RazorpayWebhookSchemaType) {
  const prisma = getPrismaClient();
  const secret = '6d2Lv76AugGojJGt1Wa7MEgFZmSZaq5z';

  const webhookSignature = data.signature;
  delete (data as { signature?: string }).signature;

  const dataString = JSON.stringify(data);

  const generatedSignature = CryptoJS.HmacSHA256(dataString, secret).toString(
    CryptoJS.enc.Hex,
  );

  if (generatedSignature === webhookSignature) {
    // Handle the event
    const event = data.event;
    const payload = data.payload;

    if (event === 'payment.captured') {
      const RazorpayOrderId = payload.payment.entity['order_id'];
      console.log('orderId: ', RazorpayOrderId);

      // Fetch payment entries with the given paymentGatewayRef and their current status
      const paymentDetails = await prisma.payment.findMany({
        where: { paymentGatewayRef: RazorpayOrderId },
        select: { id: true, orderId: true, status: true },
      });

      // Check if any payments need to be updated
      const paymentsToUpdate = paymentDetails.filter(
        (payment) => payment.status !== 'captured',
      );
      if (paymentsToUpdate.length > 0) {
        // Update all related payment entries to 'captured'
        await prisma.payment.updateMany({
          where: { id: { in: paymentsToUpdate.map((payment) => payment.id) } },
          data: { status: 'captured' },
        });
        console.log('Payments updated to captured.');
      }

      // Extract unique orderIds from the payments that need to be updated
      const orderIds = [
        ...new Set(paymentsToUpdate.map((payment) => payment.orderId)),
      ];

      if (orderIds.length > 0) {
        // Fetch orders with these ids and their current status
        const orderDetails = await prisma.order.findMany({
          where: { id: { in: orderIds } },
          select: { id: true, status: true },
        });

        // Check if any orders need to be updated
        const ordersToUpdate = orderDetails.filter(
          (order) => order.status !== 'PAID',
        );
        if (ordersToUpdate.length > 0) {
          // Update each related order to 'PAID'
          await prisma.order.updateMany({
            where: { id: { in: ordersToUpdate.map((order) => order.id) } },
            data: { status: 'PAID' },
          });
          console.log('Orders updated to PAID.');
        }
      }
    }
  } else {
    throw new Error('Invalid webhook signature');
  }
}

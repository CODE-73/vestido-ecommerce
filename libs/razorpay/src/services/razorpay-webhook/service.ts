import { getPrismaClient } from '@vestido-ecommerce/models';

import { generateWebhookSignature } from '../signature';
import { RazorpayWebhookSchemaType } from './zod';

export async function handleRazorpayWebhook(data: RazorpayWebhookSchemaType) {
  const prisma = getPrismaClient();

  const webhookSignature = data.signature;
  delete (data as { signature?: string }).signature;
  const dataString = JSON.stringify(data);

  const generatedSignature = generateWebhookSignature(dataString);

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
        (payment) => payment.status !== 'CAPTURED',
      );
      if (paymentsToUpdate.length > 0) {
        // Update all related payment entries to 'captured'
        await prisma.payment.updateMany({
          where: { id: { in: paymentsToUpdate.map((payment) => payment.id) } },
          data: { status: 'CAPTURED' },
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
          select: { id: true, orderStatus: true },
        });

        // Check if any orders need to be updated
        const ordersToUpdate = orderDetails.filter(
          (order) => order.orderStatus !== 'CONFIRMED',
        );
        if (ordersToUpdate.length > 0) {
          // Update each related order to 'PAID'
          await prisma.order.updateMany({
            where: { id: { in: ordersToUpdate.map((order) => order.id) } },
            data: { orderStatus: 'CONFIRMED' },
          });
          console.log('Orders updated to CONFIRMED.');
        }
      }
    }

    if (event === 'payment.failed') {
      const RazorpayOrderId = payload.payment.entity['order_id'];
      console.log('orderId: ', RazorpayOrderId);

      // Fetch payment entries with the given paymentGatewayRef and their current status
      const paymentDetails = await prisma.payment.findMany({
        where: { paymentGatewayRef: RazorpayOrderId },
        select: { id: true, orderId: true, status: true },
      });

      // Check if any payments need to be updated
      const paymentsToUpdate = paymentDetails.filter(
        (payment) => payment.status !== 'FAILED',
      );
      if (paymentsToUpdate.length > 0) {
        // Update all related payment entries to 'FAILED'
        await prisma.payment.updateMany({
          where: { id: { in: paymentsToUpdate.map((payment) => payment.id) } },
          data: { status: 'FAILED' },
        });
        console.log('Payments updated to FAILED.');
      }

      // Extract unique orderIds from the payments that need to be updated
      const orderIds = [
        ...new Set(paymentsToUpdate.map((payment) => payment.orderId)),
      ];

      if (orderIds.length > 0) {
        // Fetch orders with these ids and their current status
        const orderDetails = await prisma.order.findMany({
          where: { id: { in: orderIds } },
          select: { id: true, orderStatus: true },
        });

        // Check if any orders need to be updated
        const ordersToUpdate = orderDetails.filter(
          (order) => order.orderStatus !== 'CANCELLED',
        );
        if (ordersToUpdate.length > 0) {
          // Update each related order to 'CANCELLED'
          await prisma.order.updateMany({
            where: { id: { in: ordersToUpdate.map((order) => order.id) } },
            data: { orderStatus: 'CANCELLED' },
          });
          console.log('Orders updated to CANCELLED.');
        }
      }
    }
  } else {
    throw new Error('Invalid webhook signature');
  }
}

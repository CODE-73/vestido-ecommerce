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
    const event = data.event;
    const payload = data.payload;

    if (event === 'payment.captured') {
      const RazorpayOrderId = payload.payment.entity['order_id'];

      const result = await prisma.$transaction(async (transaction) => {
        // Fetch payment entries with the given paymentGatewayRef and their current status
        const paymentDetails = await transaction.payment.findMany({
          where: { paymentGatewayRef: RazorpayOrderId },
          select: { id: true, orderId: true, status: true },
        });

        // Check if any payments need to be updated
        const paymentsToUpdate = paymentDetails.filter(
          (payment) => payment.status !== 'CAPTURED',
        );

        if (paymentsToUpdate.length > 0) {
          // Update all related payment entries to 'captured'
          await transaction.payment.updateMany({
            where: {
              id: { in: paymentsToUpdate.map((payment) => payment.id) },
            },
            data: { status: 'CAPTURED' },
          });
          console.log('Payments updated to captured.');
        }

        const orderIds = [
          ...new Set(paymentsToUpdate.map((payment) => payment.orderId)),
        ];

        if (orderIds.length > 0) {
          // Fetch orders with these ids and their current status
          const orderDetails = await transaction.order.findMany({
            where: { id: { in: orderIds } },
            select: { id: true, orderPaymentStatus: true },
          });

          // Check if any orders need to be updated
          const ordersToUpdate = orderDetails.filter(
            (order) => order.orderPaymentStatus !== 'CAPTURED',
          );

          if (ordersToUpdate.length > 0) {
            // Update each related order to 'PAID'
            await transaction.order.updateMany({
              where: { id: { in: ordersToUpdate.map((order) => order.id) } },
              data: {
                orderStatus: 'CONFIRMED',
                orderPaymentStatus: 'CAPTURED',
              },
            });
            console.log('Orders updated to CONFIRMED.');
            // Update the status of associated OrderItems to CONFIRMED
            await transaction.orderItem.updateMany({
              where: { orderId: { in: orderIds } },
              data: { status: 'CONFIRMED' },
            });
            console.log('OrderItems updated to CONFIRMED.');
          }
        }
      });

      console.log('Transaction completed successfully:', result);
    }

    if (event === 'payment.failed') {
      const RazorpayOrderId = payload.payment.entity['order_id'];

      const result = await prisma.$transaction(async (transaction) => {
        // Fetch payment entries with the given paymentGatewayRef and their current status
        const paymentDetails = await transaction.payment.findMany({
          where: { paymentGatewayRef: RazorpayOrderId },
          select: { id: true, orderId: true, status: true },
        });

        // Check if any payments need to be updated
        const paymentsToUpdate = paymentDetails.filter(
          (payment) => payment.status !== 'FAILED',
        );

        if (paymentsToUpdate.length > 0) {
          // Update all related payment entries to 'FAILED'
          await transaction.payment.updateMany({
            where: {
              id: { in: paymentsToUpdate.map((payment) => payment.id) },
            },
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
          const orderDetails = await transaction.order.findMany({
            where: { id: { in: orderIds } },
            select: { id: true, orderPaymentStatus: true },
          });

          // Check if any orders need to be updated
          const ordersToUpdate = orderDetails.filter(
            (order) => order.orderPaymentStatus !== 'FAILED',
          );

          if (ordersToUpdate.length > 0) {
            // Update each related order to 'CANCELLED'
            await transaction.order.updateMany({
              where: { id: { in: ordersToUpdate.map((order) => order.id) } },
              data: { orderPaymentStatus: 'FAILED', orderStatus: 'CANCELLED' },
            });
            console.log('Orders updated to CANCELLED.');

            await transaction.orderItem.updateMany({
              where: { orderId: { in: orderIds } },
              data: { status: 'CANCELLED' },
            });
            console.log('OrderItems updated to CANCELLED.');
          }
        }
      });

      console.log('Transaction completed successfully:', result);
    }
  } else {
    throw new Error('Invalid webhook signature');
  }
}

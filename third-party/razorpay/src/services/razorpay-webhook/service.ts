import { getPrismaClient } from '@vestido-ecommerce/models';
import { VestidoError } from '@vestido-ecommerce/utils';

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

    await prisma.webhookLog.create({
      data: {
        logType: 'RAZORPAY',
        rawData: data,
      },
    });

    if (event === 'payment.captured') {
      const RazorpayOrderId = payload.payment.entity['order_id'];

      const result = await prisma.$transaction(async (transaction) => {
        // Fetch payment entries with the given paymentGatewayRef and their current status
        const paymentDetails = await transaction.payment.findMany({
          where: {
            paymentGatewayRef: {
              contains: RazorpayOrderId,
            },
          },
          select: {
            id: true,
            orderId: true,
            status: true,
            paymentGatewayRef: true,
          },
        });

        const pRow = paymentDetails.find(
          (row) =>
            JSON.parse(row.paymentGatewayRef).rpOrderId === RazorpayOrderId,
        );

        if (!pRow) {
          throw new VestidoError({
            name: 'NotFoundError',
            message: 'Order does not exist',
            httpStatus: 404,
            context: {
              RazorpayorderId: RazorpayOrderId,
            },
          });
        }

        // Update all related payment entries to 'captured'
        await transaction.payment.update({
          where: {
            id: pRow.id,
          },
          data: { status: 'CAPTURED' },
        });
        console.log('Payments updated to captured.');

        // Update each related order to 'PAID'
        await transaction.order.updateMany({
          where: { id: pRow.orderId },
          data: {
            orderStatus: 'CONFIRMED',
            orderPaymentStatus: 'CAPTURED',
          },
        });
        console.log('Orders updated to CONFIRMED.');
        // Update the status of associated OrderItems to CONFIRMED
        await transaction.orderItem.updateMany({
          where: { orderId: pRow.id },
          data: { status: 'CONFIRMED' },
        });
        console.log('OrderItems updated to CONFIRMED.');
      });

      console.log('Transaction completed successfully:', result);
    }

    if (event === 'payment.failed') {
      const RazorpayOrderId = payload.payment.entity['order_id'];

      const result = await prisma.$transaction(async (transaction) => {
        // Fetch payment entries with the given paymentGatewayRef and their current status
        const paymentDetails = await transaction.payment.findMany({
          where: {
            paymentGatewayRef: {
              contains: RazorpayOrderId,
            },
          },
          select: {
            id: true,
            orderId: true,
            status: true,
            paymentGatewayRef: true,
          },
        });

        const pRow = paymentDetails.find(
          (row) =>
            JSON.parse(row.paymentGatewayRef).rpOrderId === RazorpayOrderId,
        );

        if (!pRow) {
          throw new VestidoError({
            name: 'NotFoundError',
            message: 'Order does not exist',
            httpStatus: 404,
            context: {
              RazorpayorderId: RazorpayOrderId,
            },
          });
        }

        // Update all related payment entries to 'FAILED'
        await transaction.payment.updateMany({
          where: {
            id: pRow.id,
          },
          data: { status: 'FAILED' },
        });
        console.log('Payments updated to FAILED.');

        // Update each related order to 'CANCELLED'
        await transaction.order.updateMany({
          where: { id: pRow.id },
          data: { orderPaymentStatus: 'FAILED', orderStatus: 'CANCELLED' },
        });
        console.log('Orders updated to CANCELLED.');

        await transaction.orderItem.updateMany({
          where: { orderId: pRow.orderId },
          data: { status: 'CANCELLED' },
        });
        console.log('OrderItems updated to CANCELLED.');
      });

      console.log('Transaction completed successfully:', result);
    }
  } else {
    throw new Error('Invalid webhook signature');
  }
}

import { sendSMS, SMSSenderID, SMSTemplate } from '@vestido-ecommerce/fast2sms';
import { clearCartOnOrderCreation } from '@vestido-ecommerce/items';
import { getPrismaClient } from '@vestido-ecommerce/models';
import { VestidoError } from '@vestido-ecommerce/utils';

import { generatePaymentSignature } from '../signature';
import { verifyPaymentRequest } from './types';
import { verifyRPSignSchema } from './zod';

const IS_DEVELOPMENT = process.env['NODE_ENV'] === 'development';

export async function processPayment(data: verifyPaymentRequest) {
  const prisma = getPrismaClient();
  const validatedData = verifyRPSignSchema.parse(data);

  const { order_id, payment_RP_id, razorpay_signature } = validatedData;

  const generatedSignature = generatePaymentSignature(order_id, payment_RP_id);
  if (generatedSignature === razorpay_signature) {
    await prisma.paymentLog.create({
      data: {
        paymentId: validatedData.paymentId,
        logType: 'RAZORPAY_PAYMENT_RESPONSE_LOG',
        rawData: JSON.stringify(data),
      },
    });

    const razorpayRef = JSON.stringify({
      rpOrderId: order_id,
      rpPaymentId: payment_RP_id,
    });

    await prisma.payment.updateMany({
      where: {
        id: validatedData.paymentId,
      },
      data: {
        status: 'CAPTURED',
        paymentGatewayRef: razorpayRef,
      },
    });

    const updatedOrderIds = await prisma.payment.findMany({
      where: {
        id: validatedData.paymentId,
      },
      select: {
        orderId: true,
      },
    });

    // Update order status to 'PAID' for the fetched order IDs
    await Promise.all(
      updatedOrderIds.map(async (payment) => {
        const orderDetails = await prisma.order.update({
          where: {
            id: payment.orderId,
          },
          data: {
            orderStatus: 'CONFIRMED',
            orderPaymentStatus: 'CAPTURED',
          },
          select: {
            customerId: true,
            orderItems: {
              select: {
                qty: true,
              },
            },
            addressId: true,
            order_no: true,
          },
        });

        await prisma.orderItem.updateMany({
          where: {
            orderId: payment.orderId,
          },
          data: {
            status: 'CONFIRMED',
          },
        });

        const shippingdetails = await prisma.customerAddress.findUnique({
          where: {
            id: orderDetails.addressId,
          },
        });

        // Calculate total quantity of all items in the order
        const totalItems = orderDetails.orderItems
          .reduce((sum, item) => sum + item.qty, 0)
          .toString();

        if (!IS_DEVELOPMENT) {
          try {
            const mobile = shippingdetails?.mobile ?? '';
            if (mobile) {
              await sendSMS({
                senderId: SMSSenderID.BVSTID,
                template: SMSTemplate.ORDER_PLACED_SMS,
                variables: [orderDetails.order_no.toString(), totalItems],
                recipients: [mobile],
              });
            }
          } catch (e) {
            throw new VestidoError({
              name: 'SendOTPFailed',
              message: 'Failed to send ORDER_PLACED_SMS',
              httpStatus: 500,
              context: {
                orderDetails,
                error: e,
              },
            });
          }
        }
        await clearCartOnOrderCreation(payment.orderId);
      }),
    );

    return true;
  } else {
    await prisma.paymentLog.create({
      data: {
        paymentId: validatedData.paymentId,
        logType: 'RAZORPAY_PAYMENT_ERROR_RESPONSE_LOG',
        rawData: JSON.stringify(data),
      },
    });
    return false;
  }
}

import { getPrismaClient } from '@vestido-ecommerce/models';
import { refundRazorpay } from '@vestido-ecommerce/razorpay';
import { VestidoError } from '@vestido-ecommerce/utils';

import { CancelOrderSchema, CancelOrderSchemaType } from './zod';

export async function cancelOrder(
  data: CancelOrderSchemaType | unknown,
): Promise<boolean> {
  const prisma = getPrismaClient();
  const { orderId, reason, remarks } = CancelOrderSchema.parse(data);

  try {
    const order = await prisma.order.findFirst({
      where: {
        id: orderId,
      },
      include: {
        payments: true,
      },
    });

    if (!order) {
      throw new VestidoError({
        name: 'OrderNotFoundError',
        message: `Order ${orderId} not found`,
      });
    }

    // Check if the order has any submitted fulfillments
    const hasSubmittedFulfillments = await prisma.fulfillment.findFirst({
      where: {
        orderId,
        status: {
          not: 'DRAFT',
        },
      },
    });

    if (hasSubmittedFulfillments) {
      throw new VestidoError({
        name: 'OrderCancelFulfillmentsExistsError',
        message: `Order ${orderId} cannot be cancelled because it has submitted fulfillments.`,
      });
    }

    // Find the payment that are not Refund
    const validPayments = order.payments.filter(
      (payment) => payment.isRefund === false,
    );

    if (!validPayments) {
      throw new VestidoError({
        name: 'NotFoundError',
        message: 'Valid Payment does not exist',
        httpStatus: 404,
        context: {
          orderId: order.id,
        },
      });
    }

    // Perform database operations in a transaction
    await prisma.$transaction(async (prismaTransaction) => {
      // Check payment details
      const firstPayment = validPayments[0];
      const paymentMethod =
        firstPayment.paymentGateway === 'CASH_ON_DELIVERY' ? 'COD' : 'Prepaid';
      const isCaptured = firstPayment.status === 'CAPTURED';

      let refundResponse;

      if (paymentMethod === 'Prepaid' && isCaptured) {
        const paymentGatewayRef = JSON.parse(firstPayment.paymentGatewayRef);
        const rpPaymentId = paymentGatewayRef.rpPaymentId;

        const refundData = {
          rpPaymentId: rpPaymentId,
          amount: order.grandTotal * 100,
        };

        refundResponse = await refundRazorpay(refundData);

        console.log('Refund Response: ', refundResponse);

        if (!refundResponse || refundResponse.status === 'failed') {
          throw new VestidoError({
            name: 'RazorpayRefundFailed',
            message: `Order ${orderId} cannot be cancelled because Razorpay Refund failed`,
          });
        }

        //TODO: refundResponse.status==='pending'

        if (refundResponse.status === 'processed') {
          await prismaTransaction.payment.create({
            data: {
              order: {
                connect: {
                  id: orderId,
                },
              },
              paymentGateway: 'RAZORPAY',
              paymentGatewayRef: JSON.stringify({
                rpRefundId: refundResponse.id,
              }),
              moreDetails: 'RefundPayment',
              status: 'REFUNDED',
              currency: 'INR',
              amount: refundResponse.amount ? refundResponse.amount / 100 : 0,
              isRefund: true,
            },
          });
        }
      }

      if (paymentMethod === 'COD') {
        await prismaTransaction.payment.update({
          where: {
            id: validPayments[0].id,
          },
          data: {
            status: 'CANCELLED',
          },
          include: {
            order: true,
          },
        });
      }

      // Update the order status
      await prismaTransaction.order.update({
        where: { id: orderId },
        data: {
          orderStatus: 'CANCELLED',
          orderPaymentStatus: 'CANCELLED',
        },
      });

      // Log the cancellation in the OrderLog table
      await prismaTransaction.orderLog.create({
        data: {
          orderId,
          logType: 'USER_ORDER_CANCELLATION',
          rawData: {
            reason,
            remarks,
          },
        },
      });
    });

    return true; // Indicate successful cancellation
  } catch (error) {
    console.error('Error cancelling order:', error);
    throw new VestidoError({
      name: 'OrderCancellationFailed',
      message: `Error Cancelling Order with ID ${orderId}`,
      httpStatus: 500,
      context: {
        error,
      },
    });
  }
}

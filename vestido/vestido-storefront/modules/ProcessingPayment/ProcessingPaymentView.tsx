import { FC, useEffect } from 'react';
import { useRouter } from 'next/router';

import { useOrder } from '@vestido-ecommerce/orders/client';
import {
  useLaunchRazorpay,
  useRazorpayCreateOrder,
  useVerifyPayment,
} from '@vestido-ecommerce/razorpay';
import { VestidoError } from '@vestido-ecommerce/utils';

type ProcessingPaymentPageProps = {
  orderId: string;
};

const ProcessingPaymentView: FC<ProcessingPaymentPageProps> = ({ orderId }) => {
  const router = useRouter();
  const { data: { data: order } = { data: null } } = useOrder(orderId);

  useEffect(() => {
    // Route to home page if orderId is not provided
    if (!orderId) {
      router.replace('/');
    }
  }, [router, orderId]);

  const { trigger: createRazorpayOrderTrigger } = useRazorpayCreateOrder();
  const { trigger: launchRazorpayTrigger } = useLaunchRazorpay();
  const { trigger: verifyPaymentTrigger } = useVerifyPayment();

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    const processPayment = async () => {
      try {
        if (!order) {
          throw new VestidoError({
            name: 'OrderNotFound',
            message: `Order ${orderId} not found`,
          });
        }

        const amountInPaise = Math.round(order.totalPrice * 100);
        const razorpayData = {
          orderId,
          amount: amountInPaise,
          currency: 'INR',
        };

        const razorpayOrderResp = await createRazorpayOrderTrigger({
          razorpayData,
        });

        console.log('Razorpay Order Details:', razorpayOrderResp);
        const paymentData = {
          orderId: orderId,
          razorpayOrderId: razorpayOrderResp.razorpayOrderId,
          amount: amountInPaise,
          paymentId: razorpayOrderResp.paymentId,
        };

        const PaymentResponse = await launchRazorpayTrigger({
          ...paymentData,
        });

        const verifyPaymentData = {
          paymentId: razorpayOrderResp.paymentId,
          order_id: PaymentResponse.razorpay_order_id,
          payment_RP_id: PaymentResponse.razorpay_payment_id,
          razorpay_signature: PaymentResponse.razorpay_signature,
        };

        const verifyPaymentRespone = await verifyPaymentTrigger({
          ...verifyPaymentData,
        });
        if (!verifyPaymentRespone.success) {
          throw new VestidoError({
            name: 'RazorpayVerificationError',
            message: 'Razorpay Signature verification failed',
            httpStatus: 400,
            context: {
              paymentId: razorpayOrderResp.paymentId,
              order_id: PaymentResponse.razorpay_order_id,
              payment_RP_id: PaymentResponse.razorpay_payment_id,
              razorpay_signature: PaymentResponse.razorpay_signature,
            },
          });
        }

        // Redirect to order confirmation page
        router.replace(`/order-confirmed?orderId=${orderId}`);
      } catch (error) {
        console.error('Payment processing error:', error);
        // Handle error appropriately (e.g., show error message to user)
      }
    };

    // Call the async function
    processPayment();
  }, [
    order,
    createRazorpayOrderTrigger,
    launchRazorpayTrigger,
    verifyPaymentTrigger,
    orderId,
    router,
  ]);

  return (
    <div className="flex items-start justify-center h-screen bg-black">
      <h1 className="text-white text-4xl mt-10">ProcessingPayment</h1>
    </div>
  );
};

export default ProcessingPaymentView;

import { FC, useEffect } from 'react';
import { useRouter } from 'next/router';
import Script from 'next/script';

import { LuLoader2 } from 'react-icons/lu';

import { useOrder } from '@vestido-ecommerce/orders/client';
import {
  useLaunchRazorpay,
  useRazorpayCreateOrder,
  useVerifyPayment,
} from '@vestido-ecommerce/razorpay/client';
import { VestidoError } from '@vestido-ecommerce/utils';

type ProcessingPaymentPageProps = {
  orderId: string;
};

const ProcessingPaymentView: FC<ProcessingPaymentPageProps> = ({ orderId }) => {
  const router = useRouter();
  //  const [status, setStatus] = useState('processing');
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
    const processPayment = async () => {
      try {
        if (!order) {
          throw new VestidoError({
            name: 'OrderNotFound',
            message: `Order ${orderId} not found`,
          });
        }

        const amountInPaise = Math.round(order.grandTotal * 100);
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
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg text-center">
          <h1 className="text-3xl font-bold mb-6">Processing Your Payment</h1>
          <div className="animate-pulse">
            <LuLoader2 className="w-16 h-16 mx-auto mb-4 animate-spin text-blue-500" />
            <p className="text-lg">
              Please wait while we process your payment...
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProcessingPaymentView;

import {
  CreatePaymentRequest,
  RazorpayFailedPaymentResponse,
  RazorpayResponse,
} from './types';

export async function createNewPayment(
  args: CreatePaymentRequest,
): Promise<RazorpayResponse> {
  return new Promise<RazorpayResponse>((res) => {
    const options = {
      key: process.env['NEXT_PUBLIC_RAZORPAY_KEY_ID'] as string,
      amount: args.amount,
      currency: 'INR',
      name: 'Vestido Nation',
      description: 'New Order',
      order_id: args.razorpayOrderId,
      handler: async (r: RazorpayResponse) => {
        res(r);
        // try {
        //   const verifyData = {
        //     paymentId: args.paymentId,
        //     type: 'CAPTURE_PAYMENT',
        //     order_id: args.razorpayOrderId,
        //     payment_RP_id: razorpayOrderResponse.razorpay_payment_id,
        //     razorpay_signature: razorpayOrderResponse.razorpay_signature,
        //   };

        //   const verificationResponse = await processPayment({
        //     ...verifyData,
        //   });

        //   if (verificationResponse) {
        //     // Handle successful payment here
        //     console.log('Payment successful');
        //   } else {
        //     // Handle payment failure here
        //     console.log('Payment failed');
        //   }
        // } catch (error) {
        //   console.error('Error verifying Razorpay payment:', error);
        // }
      },
      prefill: {
        name: 'Customer Name',
        email: 'customer@example.com',
        contact: '8086960896',
      },
      notes: {
        address: 'Customer Address',
      },
      theme: {
        color: '#F37254',
      },
    };
    console.log('Options: ', options);

    // Razorpay is installed as a global <script />
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const rzp1 = new (window as any).Razorpay(options);

    rzp1.on(
      'payment.failed',
      function (response: RazorpayFailedPaymentResponse) {
        alert(response.error.code);
        alert(response.error.description);
        alert(response.error.source);
        alert(response.error.step);
        alert(response.error.reason);
        alert(response.error.metadata.order_id);
        alert(response.error.metadata.payment_id);
      },
    );
    rzp1.open();
  });
}
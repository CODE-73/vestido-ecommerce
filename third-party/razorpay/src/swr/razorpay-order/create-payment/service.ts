import { Profile } from '@prisma/client';

import {
  CreatePaymentRequest,
  RazorpayFailedPaymentResponse,
  RazorpayResponse,
} from './types';

export async function createRazorpayPayment(
  args: CreatePaymentRequest,
  authHeaders: Record<string, string>,
  profile: Profile,
): Promise<RazorpayResponse> {
  const backButtonHandler = handleBackButton(args.paymentId, authHeaders);

  return new Promise<RazorpayResponse>((res, rej) => {
    const options = {
      key: process.env['NEXT_PUBLIC_RAZORPAY_KEY_ID'] as string,
      amount: args.amount,
      currency: 'INR',
      name: 'Vestido Nation',
      description: 'Your style. Your Statement.',
      order_id: args.razorpayOrderId,
      handler: async (r: RazorpayResponse) => {
        backButtonHandler.remove();
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
        name: `${profile.firstName} ${profile.lastName}`.trim(),
        email: profile.email || `${profile.mobile}@vestidonation.com`,
        contact: profile.mobile,
      },
      notes: {},
      theme: {
        color: '#000000',
      },
      modal: {
        ondismiss: async () => {
          backButtonHandler.remove();

          console.log('Payment modal closed by the user.');
          await invokeCancelPayment(args.paymentId, authHeaders);

          window.location.href = '/checkout'; // Redirect to checkout page
        },
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

        backButtonHandler.remove();
        rej('Payment Failed' + response.error);
      },
    );
    rzp1.open();
  });
}

async function invokeCancelPayment(
  paymentId: string,
  authHeaders: Record<string, string>,
) {
  const r = await fetch(`/api/payments/${paymentId}/cancel`, {
    method: 'POST',
    headers: {
      ...authHeaders,
    },
  });

  if (!r.ok) {
    throw new Error('Failed to cancel payment');
  }
}

function handleBackButton(
  paymentId: string,
  authHeaders: Record<string, string>,
) {
  let paymentInProgress = true;

  // Push a new state to create a history entry
  const historyState = { paymentId: paymentId };
  window.history.pushState(historyState, '', window.location.href);
  const handlePopState = async (_event: PopStateEvent) => {
    if (paymentInProgress) {
      // Prevent the default back action
      window.history.pushState(historyState, '', window.location.href);

      // Show a warning to the user
      if (
        confirm('Are you sure you want to leave? Your payment is in progress.')
      ) {
        paymentInProgress = false;
        // Cancel the payment
        await invokeCancelPayment(paymentId, authHeaders);
        window.location.href = '/checkout';
      }
    }
  };
  window.addEventListener('popstate', handlePopState);

  return {
    remove: () => {
      paymentInProgress = false;
      window.removeEventListener('popstate', handlePopState);
    },
  };
}

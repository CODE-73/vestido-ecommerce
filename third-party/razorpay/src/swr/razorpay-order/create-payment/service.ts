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

          // backButtonHandler.goBackToCheckout();
          window.location.replace('/checkout');
          rej('Payment modal closed by the user.');
        },
      },
    };

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

/**
 * On Mobile, when the Razorpay payment modal is open,
 * Clicking Back Button is causing Next.js Router to pick it up and cause
 * a navigation to the previous page in the BACKGROUND.
 */
function handleBackButton(
  paymentId: string,
  authHeaders: Record<string, string>,
) {
  let paymentInProgress = true;

  const goBackToCheckout = () => {
    console.info('Going back to checkout');
    if (history.state.isIntermediaryState) {
      history.go(-2); // Go back to /checkout
      console.info('Going back by 2');
    } else {
      history.go(-1); // Go back to /checkout
      console.info('Going back by 1');
    }
  };

  // Push a new state to create a history entry
  const historyState = { paymentId: paymentId, isIntermediaryState: true };
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
        // Redirect to the checkout page
        goBackToCheckout();
      }
    }
  };
  window.addEventListener('popstate', handlePopState);

  return {
    remove: () => {
      paymentInProgress = false;
      window.removeEventListener('popstate', handlePopState);
    },
    goBackToCheckout,
  };
}

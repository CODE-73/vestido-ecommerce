# Razorpay Integration

- User clicks Checkout on the Cart after selecting the Address and Everything.
- Create a Pending Order in the BE. If the MOP is Cash, insert OrderPayment within the same Request. Return.
- If the MOP is Razorpay invoke `POST /api/orders/[orderId]/payments`.
  This will invoke razorpay.orders.create which will generate a paymentGatewayRef / id.
  This will be inserted to Payment Table and then, Payment.id will be returned.
- Front End will invoke Razorypay Payment Interface with the recently generated paymentGatewayRef
- RazorPayOptions.handler passed to Razorpar while opening the Payment Interface will get invoked after the user completes his interaction.
- Within it, front end will invoke `POST /api/payments/[paymentId]` where paymentId is our PaymentTable.id
- Our backend will update PaymentRow status appropriately.

## Webhook Notes

Razorpay supports webhooks and we get notified on `POST /api/orders/webhook`.

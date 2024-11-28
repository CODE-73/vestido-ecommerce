export * from './address/create-address';
export * from './address/delete-address';
export * from './address/get-address';
export * from './address/list-address';
export * from './address/update-address';
export * from './fulfillment/cancel-fulfillment';
export * from './fulfillment/create-fulfillment';
export * from './fulfillment/delete-fulfillment';
export * from './fulfillment/get-fulfillment';
export * from './fulfillment/list-fulfillment';
export * from './fulfillment/submit-fulfillment';
export * from './fulfillment/update-fulfillment';
export * from './orders/calculate-total';
export * from './orders/cancel-order';
export * from './orders/create-order';
export * from './orders/get-order';
export * from './orders/list-admin-orders';
export * from './orders/list-order';
export * from './orders/track-order';
export * from './orders/update-order';
export * from './payment/get-payment';
export * from './shipping/get-shipping-charge';

// @ts-expect-error BigInt JSON Serialization
// We have BigInts on Order.order_no & Fulfillment.fulfillment_no
// https://github.com/GoogleChromeLabs/jsbi/issues/30#issuecomment-953187833
BigInt.prototype.toJSON = function () {
  return this.toString();
};

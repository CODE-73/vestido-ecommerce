import { ShippingChargesSchemaType } from './zod';

export type shippingChargesRequest = ShippingChargesSchemaType;

export type shippingChargesResponse = {
  data: {
    shippingCost: number;
    estimatedDelivery: Date;
    deliveryAvailable: boolean;
  };
};

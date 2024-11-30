import { VestidoError } from '@vestido-ecommerce/utils';

import { invokeShiprocketAPI } from '../invoke-shiprocket-api';
import { CreateShiprocketOrderType } from './types';

export async function createShiprocketOrder(data: CreateShiprocketOrderType) {
  const body = {
    order_id: data.fulfillmentId,
    order_date: data.orderDate,
    pickup_location: data.pickupLocation,
    channel_id: '',
    comment: '',
    billing_customer_name: data.billing_customer_name,
    billing_last_name: data.billing_last_name,
    billing_address: data.billing_address,
    billing_address_2: data.billing_address_2,
    billing_city: data.billing_city,
    billing_pincode: data.billing_pincode,
    billing_state: data.billing_state,
    billing_country: 'India',
    billing_email: data.billing_email,
    billing_phone: data.billing_phone,
    shipping_is_billing: data.shippingIsBilling,
    shipping_customer_name: '',
    shipping_last_name: '',
    shipping_address: '',
    shipping_address_2: '',
    shipping_city: '',
    shipping_pincode: '',
    shipping_country: '',
    shipping_state: '',
    shipping_email: '',
    shipping_phone: '',
    order_items: data.order_items,
    payment_method: data.paymentMethod,
    shipping_charges: 0,
    giftwrap_charges: 0,
    transaction_charges: 0,
    total_discount: 0,
    sub_total: data.totalAmount,
    length: data.length,
    breadth: data.length,
    height: data.height,
    weight: data.weight,
  };

  try {
    const response = await invokeShiprocketAPI('/orders/create/adhoc', {
      method: 'POST',
      body: { ...body },
    });

    if (!response.order_id) {
      throw new VestidoError({
        name: 'ShiprocketOrderCreationFailed',
        message: `Could Not Create Shiprocket Order`,
        httpStatus: 404,
        context: {
          errorMessage: response.message || response,
        },
      });
    }

    return response;
  } catch (e) {
    if (e instanceof VestidoError) {
      e.name = 'ShipRocketCreateOrderFailed';
    }
    throw e;
  }
}

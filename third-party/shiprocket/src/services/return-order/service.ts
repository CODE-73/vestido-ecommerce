import { VestidoError } from '@vestido-ecommerce/utils';

import { invokeShiprocketAPI } from '../invoke-shiprocket-api';
import { CreateShiprocketReturnOrderType } from './types';

export async function createShiprocketReturnOrder(
  data: CreateShiprocketReturnOrderType,
) {
  const body = {
    order_id: data.order_id,
    order_date: data.order_date,
    pickup_customer_name: data.pickup_customer_name,
    pickup_last_name: data.pickup_last_name,
    pickup_address: data.pickup_address,
    pickup_address_2: data.pickup_address_2,
    pickup_city: data.pickup_city,
    pickup_state: data.pickup_state,
    pickup_country: 'India',
    pickup_pincode: data.pickup_pincode,
    pickup_email: data.pickup_email,
    pickup_phone: data.pickup_phone,
    shipping_customer_name: 'Saran',
    shipping_last_name: 'Manoj',
    shipping_address:
      '63-2491 Bhima Complex, 4th Floor, Intercity Arcade , Jaffer Khan Colony Rd',
    shipping_address_2: 'Mavoor Road',
    shipping_city: 'Kozhikode',
    shipping_state: 'Kerala',
    shipping_country: 'India',
    shipping_pincode: '673004',
    shipping_email: 'inventory@vestidonation.com',
    shipping_phone: '8848378040',
    order_items: data.return_items,
    payment_method: data.payment_method,
    total_discount: data.total_discount,
    sub_total: data.refund_amount,
    length: data.length,
    breadth: data.breadth,
    height: data.height,
    weight: data.weight,
  };

  try {
    const response = await invokeShiprocketAPI('/orders/create/return', {
      method: 'POST',
      body: { ...body },
    });

    if (!response.order_id) {
      throw new VestidoError({
        name: 'ShiprocketReturnOrderCreationFailed',
        message: `Could Not Create Shiprocket Return Order`,
        httpStatus: 404,
        context: {
          response,
        },
      });
    }

    return response;
  } catch (e) {
    if (e instanceof VestidoError) {
      e.name = 'ShipRocketReturnOrderFailed';
    }
    throw e;
  }
}

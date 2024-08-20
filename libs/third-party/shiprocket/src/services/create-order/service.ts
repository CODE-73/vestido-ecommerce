import { invokeShiprocketAPI } from '../invoke-shiprocket-api';
import { CreateShiprocketOrderType } from './types';

export async function createShiprocketOrder(data: CreateShiprocketOrderType) {
  const body = {
    order_id: data.fulfillmentId,
    order_date: '2019-07-24 11:11',
    pickup_location: 'Home',
    channel_id: '',
    comment: 'Reseller: M/s Goku',
    billing_customer_name: 'Naruto',
    billing_last_name: 'Uzumaki',
    billing_address: 'House 221B, Leaf Village',
    billing_address_2: 'Near Hokage House',
    billing_city: 'New Delhi',
    billing_pincode: '110002',
    billing_state: 'Delhi',
    billing_country: 'India',
    billing_email: 'naruto@uzumaki.com',
    billing_phone: '9876543210',
    shipping_is_billing: true,
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
    order_items: [
      {
        name: 'Kunai',
        sku: 'chakra123',
        units: 10,
        selling_price: '900',
        discount: '',
        tax: '',
        hsn: 441122,
      },
    ],
    payment_method: 'Prepaid',
    shipping_charges: 0,
    giftwrap_charges: 0,
    transaction_charges: 0,
    total_discount: 0,
    sub_total: 9000,
    length: 10,
    breadth: 15,
    height: 20,
    weight: 2.5,
  };

  const response = await invokeShiprocketAPI('/orders/create/adhoc', {
    method: 'POST',
    body: body,
  });

  return response;
}

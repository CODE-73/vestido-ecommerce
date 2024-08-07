import * as React from 'react';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { LuChevronRight } from 'react-icons/lu';
import { z } from 'zod';

import { useCart } from '@vestido-ecommerce/items';
import {
  useCreateCOD,
  useCreateOrder,
  useShippingCharges,
} from '@vestido-ecommerce/orders';
import {
  useRazorpayCreateOrder,
  useVerifyPayment,
} from '@vestido-ecommerce/razorpay';
import { Button } from '@vestido-ecommerce/shadcn-ui/button';
import { Dialog, DialogTrigger } from '@vestido-ecommerce/shadcn-ui/dialog';
import { Form } from '@vestido-ecommerce/shadcn-ui/form';
import { ImageSchemaType } from '@vestido-ecommerce/utils';

import AddAddressDialog from './AddAddressDialog';
import { CustomerAddressElement } from './CustomerAddressElement';
import { PaymentTypeElement } from './PaymentTypeElement';

const OrderItemSchema = z.object({
  itemId: z.string().uuid(),
  price: z.coerce.number(),
  qty: z.number().int(),
});

const CreateOrderFormSchema = z.object({
  addressId: z.string().uuid(),
  orderItems: z.array(OrderItemSchema),
  paymentType: z.enum(['ONLINE', 'CASH_ON_DELIVERY']),
});

// types.tsx

export interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

export interface RazorpayOptions {
  key_id: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string; // assuming order_id is a string; adjust if it should be a different type
  handler: (razorpayOrderResponse: RazorpayResponse) => Promise<void>;
  prefill: {
    name: string;
    email: string;
    contact: string;
  };
  notes: {
    address: string;
  };
  theme: {
    color: string;
  };
}

export interface RazorpayFailedPaymentResponse {
  error: {
    code: string;
    description: string;
    source: string;
    step: string;
    reason: string;
    metadata: {
      order_id: string;
      payment_id: string;
    };
  };
}

export type CreateOrderForm = z.infer<typeof CreateOrderFormSchema>;
const CheckoutView: React.FC = () => {
  const { data: cartItems } = useCart();
  // const { data: addresses } = useAddresses();

  const [currentSession, setCurrentSession] = useState('Address');

  const form = useForm<CreateOrderForm>({
    resolver: zodResolver(CreateOrderFormSchema),
    defaultValues: {},
  });

  useEffect(() => {
    if (cartItems?.data?.length) {
      form.setValue(
        'orderItems',
        cartItems?.data.map((cartItem) => ({
          itemId: cartItem.itemId,
          price: cartItem.item.price,
          qty: cartItem.qty,
        })),
      );
      // form.setValue('addressId', sortedAddresses[0].id);
      // form.setValue('addressId', addresses?.data?.find((x) => x.default)?.id!);
    }
  }, [cartItems?.data, form]);

  const [shippingAddressId, paymentType] = form.watch([
    'addressId',
    'paymentType',
  ]);

  const { data: shipping } = useShippingCharges({
    shippingAddressId,
    paymentType,
  });

  const shippingCharges = shipping?.data?.shippingCost ?? 0;

  const { trigger: createOrderTrigger } = useCreateOrder();
  const { trigger: createRazorpayOrderTrigger } = useRazorpayCreateOrder();
  const { trigger: createVerifyPaymentTrigger } = useVerifyPayment();
  const { trigger: createCODTrigger } = useCreateCOD();

  const totalPrice =
    cartItems?.data.reduce((total, item) => {
      return total + item.qty * item.item.price;
    }, 0) ?? 0;

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleSubmit = async (data: CreateOrderForm) => {
    try {
      const createOrderResponse = await createOrderTrigger({
        ...data,
      });
      console.log('Create Order Response: ', createOrderResponse);

      const orderId = createOrderResponse.data.id;
      const currency = 'INR';
      const toPay = totalPrice + shippingCharges;
      const amountInPaise = Math.round(toPay * 100);

      if (paymentType == 'ONLINE') {
        const razorpayData = {
          orderId,
          amount: amountInPaise,
          currency,
        };

        const razorpayOrderResp = await createRazorpayOrderTrigger({
          razorpayData,
        });

        const options = {
          key: 'rzp_test_NUv3lWuzHRmchC',
          amount: amountInPaise,
          currency: currency,
          name: 'Vestido Nation',
          description: 'New Order',
          order_id: razorpayOrderResp.razorpayOrderId,
          handler: async (razorpayOrderResponse: RazorpayResponse) => {
            try {
              const verifyData = {
                paymentId: razorpayOrderResp.paymentId,
                type: 'CAPTURE_PAYMENT',
                order_id: razorpayOrderResp.razorpayOrderId,
                payment_RP_id: razorpayOrderResponse.razorpay_payment_id,
                razorpay_signature: razorpayOrderResponse.razorpay_signature,
              };

              const verificationResponse = await createVerifyPaymentTrigger({
                ...verifyData,
              });

              if (verificationResponse.success) {
                // Handle successful payment here
                console.log('Payment successful');
              } else {
                // Handle payment failure here
                console.log('Payment failed');
              }
            } catch (error) {
              console.error('Error verifying Razorpay payment:', error);
            }
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

        const rzp1 = new window.Razorpay(options);

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
      } else {
        //const shipmentOrderId = ....create shipment orderId
        const codData = {
          orderId,
          amount: amountInPaise,
          currency,
        };
        const payId = await createCODTrigger({
          ...codData,
        });
        console.log('Payment Id: ', payId);
      }
    } catch (e) {
      console.error('Error creating order:', e);
    }
  };

  return (
    <>
      {currentSession == 'Address' && (
        <div className="text-lg tracking-wide text-gray-300 text-center font-semibold md:mt-12 md:mb-12 mt-32 mb-16 uppercase">
          <span className="text-black">
            <Link href="/cart">Cart ----- </Link>
          </span>
          <span className="text-[#48CAB2] text-2xl underline decoration-4 underline-offset-3">
            Address
          </span>
          ----- Payment
        </div>
      )}
      {currentSession == 'Payment' && (
        <div className="text-lg tracking-wide text-gray-300 text-center font-semibold md:mt-12 md:mb-12 mt-32 mb-16 uppercase">
          <span className="text-black">
            <Link href="/cart">Cart ----- </Link>
          </span>
          <span
            onClick={() => setCurrentSession('Address')}
            className="text-black cursor-pointer"
          >
            Address -----
          </span>
          <span className="text-[#48CAB2] text-2xl underline decoration-4 underline-offset-3">
            Payment
          </span>
        </div>
      )}
      {currentSession == 'Payment' ? (
        <div className="text-lg font-semibold pb-3 pl-3 md:pl-0">
          Choose a Payment Method
        </div>
      ) : (
        <div className="text-lg font-semibold pb-3 pl-3 md:pl-0">
          Choose Delivery Address{' '}
        </div>
      )}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <div className=" flex flex-col items-center md:flex-row md:items-start items-start gap-2 md:divide-x">
            <div className="w-full md:w-auto px-3 md:px-0 md:basis-3/5">
              {currentSession == 'Address' ? (
                <CustomerAddressElement name="addressId" />
              ) : (
                <PaymentTypeElement name="paymentType" />
              )}

              {currentSession == 'Address' && (
                <Dialog>
                  <DialogTrigger asChild>
                    <div className="border font-semibold w-full p-5 mb-10 cursor-pointer  border-dashed text-[#48CAB2] border-3 border-gray-300">
                      + Add New Address
                    </div>
                  </DialogTrigger>
                  <AddAddressDialog isNew={true} addressId={null} />
                </Dialog>
              )}
            </div>
            <div className="md:basis-2/5 overflow-auto  px-3 md:pl-5 md:sticky top-0 w-full">
              <div className="flex flex-col">
                {cartItems?.data.map((cartItem, index) => (
                  <div key={index}>
                    <div className="flex justify-between py-3 px-2 gap-2 items-center">
                      <Image
                        className="w-10 h-12 col-span-1 "
                        src={
                          ((cartItem.item.images ?? []) as ImageSchemaType[])[0]
                            .url!
                        }
                        alt={
                          ((cartItem.item.images ?? []) as ImageSchemaType[])[0]
                            .alt!
                        }
                        width={50}
                        height={70}
                      />
                      <div className="text-sm col-span-3 text-left grow pl-5">
                        {cartItem.item.title}
                      </div>
                      <div className="text-sm col-span-1 flex justify-center text-right">
                        ₹&nbsp;{cartItem.item.price.toFixed(2)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <hr />
              <div className="flex justify-between pr-3 mt-3">
                <div className="text-md ">Subtotal</div>
                <div className=" text-lg">₹&nbsp;{totalPrice.toFixed(2)}</div>
              </div>
              <div className="flex justify-between pr-3 mt-3">
                <div className="text-md ">Shipping</div>
                <div className=" text-lg">
                  ₹&nbsp;{(shippingCharges as number).toFixed(2)}
                </div>
              </div>
              <hr />
              <div className="flex justify-between mt-3 pr-3 font-bold">
                <div className="text-md ">Total</div>
                <div className=" text-lg">
                  ₹&nbsp;{(totalPrice + (shippingCharges as number)).toFixed(2)}
                </div>
              </div>

              {currentSession == 'Address' && (
                <Button
                  disabled={!shippingAddressId}
                  type="button"
                  onClick={() => setCurrentSession('Payment')}
                  className="disabled:bg-gray-300 uppercase flex tracking-wide bg-[#48CAB2] w-full h-14 hover:bg-gray-400 text-md font-extrabold hover:text-black text-white justify-center mt-5"
                >
                  <div className="flex">
                    CHOOSE PAYMENT METHOD <LuChevronRight />
                  </div>
                </Button>
              )}
              {currentSession == 'Payment' && (
                <Button
                  type="submit"
                  className="disabled:bg-gray-300 uppercase flex tracking-wide bg-[#48CAB2] w-full h-14 hover:bg-gray-400 text-md font-extrabold hover:text-black text-white justify-center mt-5"
                >
                  <div>PROCEED TO PAYMENT</div>
                </Button>
              )}
            </div>
          </div>
        </form>
      </Form>
    </>
  );
};
export default CheckoutView;
